const express = require('express');
const app = express();
const { User } = require('./db').models;
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const rp = require('request-promise');
const chalk = require('chalk');


// For ENV Variables
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//Heroku ordinarily terminates idle dynos after 30 minutes, so this will run the app indefinitely

/* setInterval(() => {
    const _call = {
        uri: 'https://btam-aqi-twilio-alert-app.herokuapp.com/',
        headers: { 'User-Agent': 'Request-Promise' }
    };
    rp(_call)
        .then(() => console.log('call'))
        .catch(err => console.log(err))
        
    const _users = {
        uri: 'https://btam-aqi-twilio-alert-app.herokuapp.com/api/users',
        headers: { 'User-Agent': 'Request-Promise' },
        json: true
    };
    rp(_users)
        .then(users => {

            const currentDate = new Date();
            const currentHour = currentDate.getHours();

            console.log(currentHour, users[0]);
            
            // Heroku uses UTC!
            if(currentHour === 9 || currentHour === 16 || currentHour === 22 || currentHour === 23) {
                console.log('text')
                const _waqi = {
                    uri: `https://api.waqi.info/feed/${users[0].cities[0].name}/`,
                    qs: { token: `${process.env.AIR_QUALITY_INDEX_KEY}` },
                    headers: { 'User-Agent': 'Request-Promise' },
                    json: true // Automatically parses the JSON string in the response
                };
                rp(_waqi)
                    .then(res => res.data.aqi)
                    .then(aqi => {
                        if(aqi >= users[0].cities[0].aqiThreshold) {
                            const _message = {
                                method: 'POST',
                                uri: 'https://btam-aqi-twilio-alert-app.herokuapp.com/api/messages',
                                body: {
                                    to: '+15166109915',
                                    body: 'Air Quality Index > 0'
                                },
                                json: true // Automatically stringifies the body to JSON
                            };
                            rp(_message)
                                .then(() => console.log('message success'))
                                .catch(err => console.log(err))
                        }
                    })
            }
            else console.log('do not text');
        })
        .catch(err => console.log(err));
}, 1000 * 60 * 25); // Every 25 minutes */


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