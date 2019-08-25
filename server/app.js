const express = require('express');
const app = express();
const { User } = require('./db').models;
const { twilioCall, twilioDevErrMsg } = require('./twilio');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const chalk = require('chalk');


// For ENV Variables
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// To prevent test / CI from running indefinitely
// If you want to test, set environment variable: TEST=TRUE
/* if(process.env.TEST !== 'TRUE') twilioCall();  

twilioDevErrMsg(); */

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static file-serving middleware
app.use('/public', express.static(path.join(__dirname, '../public')));

// Sends our index.html (the "single page" of our SPA)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

// Auth middleware
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return next();
    
    let id;
    try {
        id = jwt.decode(token, process.env.JWT_SECRET).id;
    }
    catch(ex) {
        return next({ status: 401 });
    }
    User.findByPk(id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(next);
})

// Routes that will be accessed via AJAX that are prepended 
// with /api so that they are isolated from our GET /* wildcard.
app.use('/api/messages', require('./routes/messages'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/alerts', require('./routes/alerts'));

// Error catching endware
app.use((err, req, res, next) => {
    // code to clean up DB error messages //

    // just in case
    if (!err.stack || !err.message) next(err);

    // clean up the trace to just relevant info
    const cleanTrace = err.stack
        .split('\n')
        .filter(line => {
            // comment out the next two lines for full (verbose) stack traces
            const projectFile = line.indexOf(__dirname) > -1; // omit built-in Node code
            const nodeModule = line.indexOf('node_modules') > -1; // omit npm modules
            return projectFile && !nodeModule;
        })
        .join('\n');

    // colorize and format the output
    console.log(chalk.magenta('      ' + err.message));
    console.log('    ' + chalk.gray(cleanTrace));
    
    // send back error status
    res.status(err.status || 500).end();
})


module.exports = app;