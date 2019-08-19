const conn = require('./conn');
const User = require('./models/User');
const Alert = require('./models/Alert');


Alert.belongsTo(User);
User.hasMany(Alert);


const syncAndSeed = () => {
    let Brian, Mike, Johnny, NewYork, Chicago, Boston, Albany;

    conn.sync({ force: true })
        .then(() => Promise.all([
            User.create({ username: 'Brian', password: 'Briantam23@', phoneNumber: '5166109915' }),
            User.create({ username: 'Mike', password: 'Mike12#', phoneNumber: '5166109915' }),
            //User.create({ username: 'Johnny', password: 'Johnny34&', phoneNumber: '7183549898' })
        ]))
        .then(users => {
            [Brian, Mike/* , Johnny */] = users;
            return Promise.all([
                Alert.create({ cityName: 'New York', urlParamCityName: 'newyork', aqiThreshold: 0 }),
                Alert.create({ cityName: 'Chicago', urlParamCityName: 'chicago', aqiThreshold: 0 }),
                Alert.create({ cityName: 'Boston', urlParamCityName: 'boston', aqiThreshold: 0 }),
                Alert.create({ cityName: 'Albany', urlParamCityName: 'albany', aqiThreshold: 500 })
            ])
        })
        .then(alerts => {
            [NewYork, Chicago, Boston, Albany] = alerts;
            NewYork.setUser(Brian);
            Chicago.setUser(Brian);
            Boston.setUser(Mike);
            Albany.setUser(Mike);
        })
}


module.exports = {
    syncAndSeed,
    models: {
        User,
        Alert
    },
    conn
}