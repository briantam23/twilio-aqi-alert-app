const rp = require('request-promise');


const headers = { 'User-Agent': 'Request-Promise' }; 
const _call = {
    uri: 'https://btam-aqi-twilio-alert-app.herokuapp.com/',
    headers
};

const currentDate = new Date();
const currentHour = currentDate.getHours();
console.log(currentHour);


const twilioCall = () => {
    
    setInterval(() => {
        
        //Heroku ordinarily terminates idle dynos after 30 minutes, so this will run the app indefinitely
        rp(_call)
            .then(() => console.log('call'))
            .catch(err => console.log(err))
            
        const _users = {
            //uri: 'https://btam-aqi-twilio-alert-app.herokuapp.com/api/users',
            uri: 'http://localhost:3000/api/users',
            headers,
            json: true
        };
        rp(_users).then(users => {

            //console.log(users);
            // Heroku uses UTC!
            //if(currentHour === 12 || currentHour === 13) {  // 8AM / 9AM (EDT)
            if(currentHour === 8 || currentHour === 9 || currentHour === 22 || currentHour === 23) {
                
                users.forEach(user => {

                    console.log('text')
                    console.log(user.alerts)
                    user.alerts.forEach(city => {

                        console.log(city)
                        const _waqi = {
                            uri: `https://api.waqi.info/feed/${city.cityName}/`,
                            qs: { token: `${process.env.AIR_QUALITY_INDEX_KEY}` },
                            headers,
                            json: true // Automatically parses the JSON string in the response
                        };
                        rp(_waqi)
                            .then(res => res.data.aqi)
                            .then(aqi => {
                                    if(aqi >= city.aqiThreshold) {
                                        console.log(user)
                                        const _message = {
                                            method: 'POST',
                                            //uri: 'https://btam-aqi-twilio-alert-app.herokuapp.com/api/messages',
                                            uri: 'http://localhost:3000/api/messages',
                                            body: {
                                                to: user.phoneNumber,
                                                body: 'Air Quality Index > ' + city.aqiThreshold
                                            },
                                            json: true
                                        };
                                        rp(_message)
                                            .then(() => console.log('message success'))
                                            .catch(err => console.log(err))
                                    }
                                    else console.log('do not text');
                                })
                    })
                })
            }
            else console.log('do not text (wrong time)');
        }).catch(err => console.log(err));
    }, 1000 * 15); // Every 15 seconds
    //1000 * 60 * 25); // Every 25 minutes
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