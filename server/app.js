const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const chalk = require('chalk');


try {
    Object.assign(process.env, require('../.env.js'));
}
catch(ex) {
    console.log(ex);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static file-serving middleware
app.use('/public', express.static(path.join(__dirname, '../public')));

// Sends our index.html (the "single page" of our SPA)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

// Routes that will be accessed via AJAX that are prepended 
// with /api so that they are isolated from our GET /* wildcard.
app.use('/api/messages', require('./routes/messages'));
app.use('/api/users', require('./routes/users'));
app.use('/api/cities', require('./routes/cities'));

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