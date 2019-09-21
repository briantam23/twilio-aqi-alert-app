const rp = require('request-promise');
const { headers, json, keepAppRunning, _waqi, _message, _users, alertUsers, currentHour, _devError } = require('./util');


const alertUser = (user, alert) => {
    const { AIR_QUALITY_INDEX_KEY } = process.env;

    rp(_waqi(alert, AIR_QUALITY_INDEX_KEY))
        .then(res => res.data.aqi)
        .then(aqi => {
                console.log(aqi, alert.aqiThreshold);

                if(aqi >= alert.aqiThreshold) {
                    console.log('text')

                    rp(_message(user, alert))
                        .then(() => console.log('message success'))
                        .catch(err => console.log(err))
                }
                else console.log('do not text');
        })
}

const twilioCall = () => {
    //Heroku ordinarily terminates idle dynos after 30 minutes, so this will run the app indefinitely
    //**Temporarily disable this month due to limited dyno hours**
    //setInterval(() => keepAppRunning(), 1000 * 60 * 25) // Every 25 minutes

    setInterval(() => {
        console.log(currentHour()); 

        if(currentHour() === 20) {   
            rp(_users)
                .then(users => alertUsers(users, alertUser))
                .catch(err => console.log(err));
        }
        else console.log('do not text (wrong time)');

    }, 1000 * 60 * 60); // Every hour
    //}, 1000 * 5); // Every 5 seconds (for testing)
}


//Send SMS of Twilio error message to developer
const twilioDevErrMsg = () => {
    process.on('uncaughtException', err => {
        console.log(err);
        const { TWILIO_PHONE_NUMBER, OWN_PHONE_NUMBER } = process.env;

        client.messages
            .create(_devError(TWILIO_PHONE_NUMBER, OWN_PHONE_NUMBER, err))
            .catch(e => console.error('Got an error:', e.code, e.message))
            //(twilioErr, message) => if(twilioErr) console.log('Twilio error: ' + twilioErr);
    }) 
}


module.exports = { twilioCall, twilioDevErrMsg };