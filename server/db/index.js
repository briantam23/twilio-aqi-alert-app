const conn = require('./conn');
const User = require('./models/User');
const Alert = require('./models/Alert');
const bcrypt = require('bcrypt');


Alert.belongsTo(User);
User.hasMany(Alert);


const syncAndSeed = () => {
    let NewYork, LosAngeles, Boston, Albany;

    conn.sync({ force: true })
        .then(() => (
            Promise.all([
                Alert.create({ cityName: 'New York', urlParamCityName: 'newyork', aqiThreshold: 0 }),
                Alert.create({ cityName: 'Los Angeles', urlParamCityName: 'losangeles', aqiThreshold: 0 }),
                Alert.create({ cityName: 'Boston', urlParamCityName: 'boston', aqiThreshold: 0 }),
                Alert.create({ cityName: 'Albany', urlParamCityName: 'albany', aqiThreshold: 500 })
            ])
        ))
        .then(alerts => {
            [NewYork, LosAngeles, Boston, Albany] = alerts;
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds)
                .then(salt => bcrypt.hash('Briantam23@', salt))
                .then(hash => {
                    User.create({ username: 'Brian', password: hash, phoneNumber: '5166109915' })
                        .then(Brian => {
                            NewYork.setUser(Brian);
                            LosAngeles.setUser(Brian);
                        })
            })
            bcrypt.genSalt(saltRounds)
                .then(salt => bcrypt.hash('Mike12#', salt))
                .then(hash => {
                    User.create({ username: 'Mike', password: hash, phoneNumber: '5166109915' })
                        .then(Mike => {
                            Boston.setUser(Mike);
                            Albany.setUser(Mike);
                        })
            })
            /* bcrypt.hash('Johnny34&', saltRounds, (err, hash) => {
                User.create({ username: 'Johnny', password: 'Johnny34&', phoneNumber: '7183549898' })
            } */
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