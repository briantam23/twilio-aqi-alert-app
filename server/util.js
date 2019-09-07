const rp = require('request-promise');


const headers = { 'User-Agent': 'Request-Promise' }; 
const json = true;
const _call = { uri: 'https://btam-twilio-aqi-alert.herokuapp.com/', headers };

//Heroku ordinarily terminates idle dynos after 30 minutes, so this will run the app indefinitely
const keepAppRunning = () => {
    rp(_call)
        .then(() => console.log('call (to keep app running)'))
        .catch(err => console.log(err))
}

const _waqi = (alert, token) => ({ 
    uri: `https://api.waqi.info/feed/${alert.cityName}/`, 
    qs: { token }, 
    headers, 
    json 
})

const _message = (user, alert) => ({
    method: 'POST',
    uri: 'https://btam-twilio-aqi-alert.herokuapp.com/api/messages',
    //uri: 'http://localhost:3000/api/messages',
    body: {
        to: user.phoneNumber,
        body: `${user.username} - ${alert.cityName}'s Air Quality Index > ${alert.aqiThreshold}!`
    },
    json
})

const _users = {
    uri: 'https://btam-twilio-aqi-alert.herokuapp.com/api/users',
    //uri: 'http://localhost:3000/api/users',
    headers,
    json
}

const alertUsers = (users, alertUser) => users.forEach(user => user.alerts.forEach(alert => alertUser(user, alert)));

const currentHour = () => {
    const currentDate = new Date();
    return currentDate.getHours();
}

const _devError = (from, to, err) => ({ from, to, body: 'Twilio error: ' + err });


module.exports = {
    headers,
    json,
    _call,
    keepAppRunning,
    _waqi,
    _message,
    _users,
    alertUsers,
    currentHour,
    _devError
} 