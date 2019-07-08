const conn = require('../conn');
const _ = require('lodash');


const City = conn.define('cities', {
    id: {
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    }
})

const cityHook = city => city.name = _.capitalize(city.name);

City.beforeCreate((city, options) => cityHook(city));
City.beforeUpdate((city, options) => cityHook(city));


module.exports = City;