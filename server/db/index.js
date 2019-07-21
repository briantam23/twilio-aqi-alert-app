const conn = require('./conn');
const User = require('./models/User');
const City = require('./models/City');


City.belongsTo(User);
User.hasMany(City);


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
                City.create({ name: 'NewYork', aqiThreshold: 0 }),
                City.create({ name: 'Chicago', aqiThreshold: 0 }),
                City.create({ name: 'Boston', aqiThreshold: 0 })
            ])
        })
        .then(cities => {
            [NewYork, Chicago, Boston] = cities;
            NewYork.setUser(Brian);
            Chicago.setUser(Brian);
            //Boston.setUser(Johnny);
        })
}


module.exports = {
    syncAndSeed,
    models: {
        User,
        City
    },
    conn
}