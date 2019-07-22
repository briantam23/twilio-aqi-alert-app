const conn = require('../conn');
const _ = require('lodash');


const Alert = conn.define('alerts', {
    cityName: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    urlParamCityName: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    aqiThreshold: {
        type: conn.Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100
        }
    }
})

const alertHook = alert => {
    let cityWordsArr = alert.cityName.split(' ');
    cityWordsArr = cityWordsArr.map(cityWord => _.capitalize(cityWord));

    return cityWordsArr.join(' ');
}

Alert.beforeCreate((alert, options) => alertHook(alert));
Alert.beforeUpdate((alert, options) => alertHook(alert));


module.exports = Alert;