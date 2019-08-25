const rp = require('request-promise');


const headers = { 'User-Agent': 'Request-Promise' }; 

//Heroku ordinarily terminates idle dynos after 30 minutes, so this will run the app indefinitely
const keepAppRunning = () => {

    const _call = {
        uri: 'https://btam-twilio-aqi-alert.herokuapp.com/',
        headers
    };

    rp(_call)
        .then(() => console.log('call'))
        .catch(err => console.log(err))
}

const _users = {
    //uri: 'https://btam-twilio-aqi-alert.herokuapp.com/api/users',
    uri: 'http://localhost:3000/api/users',
    headers,
    json: true
};

const currentDate = new Date();
const currentHour = currentDate.getHours();

const alertUser = (user, alert) => {

    const _waqi = {
        uri: `https://api.waqi.info/feed/${alert.cityName}/`,
        qs: { token: `${process.env.AIR_QUALITY_INDEX_KEY}` },
        headers,
        json: true // Automatically parses the JSON string in the response
    };

    rp(_waqi)
        .then(res => res.data.aqi)
        .then(aqi => {
                
                console.log(aqi, alert.aqiThreshold);
                
                if(aqi >= alert.aqiThreshold) {
                    console.log('text')

                    const _message = {
                        method: 'POST',
                        //uri: 'https://btam-twilio-aqi-alert.herokuapp.com/api/messages',
                        uri: 'http://localhost:3000/api/messages',
                        body: {
                            to: user.phoneNumber,
                            body: `${user.username} - ${alert.cityName}'s Air Quality Index > ${alert.aqiThreshold}!`
                        },
                        json: true
                    };
                    
                    rp(_message)
                        .then(() => console.log('message success'))
                        .catch(err => console.log(err))
                }
                else console.log('do not text');
        })
}


const twilioCall = () => {

    setInterval(() => {
        keepAppRunning();
    
        console.log(currentHour); // Heroku uses UTC!
        //if(currentHour === 14 || currentHour === 15) {  // UTC (10AM / 11AM EDT)
        if(currentHour === 9 || currentHour === 12 || currentHour === 13 || currentHour === 23) {   // EDT
            rp(_users)
                .then(users => users.forEach(user => user.alerts.forEach(alert => alertUser(user, alert))))
                .catch(err => console.log(err));
        }
        else console.log('do not text (wrong time)');

    //}, 1000 * 60 * 25); // Every 25 minutes
    }, 1000 * 10); // Every 10 seconds
}


//Send SMS of Twilio error message to developer
const twilioDevErrMsg = () => {

    process.on('uncaughtException', err => {
        
        console.log(err);
        
        client.messages
            .create({
                from: process.env.TWILIO_PHONE_NUMBER,
                to: process.env.OWN_PHONE_NUMBER,
                body: 'Twilio error: ' + err
            }), 
            (twilioErr, message) => {
                if(twilioErr) console.log('Twilio error: ' + twilioErr)
            }
    }) 
}


module.exports = { twilioCall, twilioDevErrMsg };