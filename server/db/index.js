const conn = require('./conn');
const User = require('./models/User');
const Alert = require('./models/Alert');


Alert.belongsTo(User);
User.hasMany(Alert);


const syncAndSeed = () => {
    let Brian, Mike, Johnny, NewYork, Chicago, Boston;

    conn.sync({ force: true })
        .then(() => Promise.all([
            User.create({ username: 'Brian', password: 'Briantam23@', phoneNumber: '5166109915' }),
            //User.create({ username: 'Mike', password: 'Mike12#' }),
            //User.create({ username: 'Johnny', password: 'Johnny34&' })
        ]))
        .then(users => {
            [Brian, Mike, Johnny] = users;
            return Promise.all([
                Alert.create({ cityName: 'New York', urlParamCityName: 'NewYork', aqiThreshold: 0 }),
                Alert.create({ cityName: 'Chicago', urlParamCityName: 'Chicago', aqiThreshold: 0 }),
                Alert.create({ cityName: 'Boston', urlParamCityName: 'Boston', aqiThreshold: 0 })
            ])
        })
        .then(alerts => {
            [NewYork, Chicago, Boston] = alerts;
            NewYork.setUser(Brian);
            Chicago.setUser(Brian);
            //Boston.setUser(Johnny);
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