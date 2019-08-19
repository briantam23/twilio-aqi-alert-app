const conn = require('../conn');
const _ = require('lodash');


const Alert = conn.define('alerts', 
    {
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
            max: 500
            }
        }
    },
    {
        hooks: {
            beforeCreate: (alert, options) => alertHook(alert),
            beforeUpdate: (alert, options) => alertHook(alert)
        }
    }
)

const alertHook = alert => {
    
    const { cityName } = alert;

    alert.cityName = cityName.split(' ').map(cityWord => _.capitalize(cityWord)).join(' ');
}


module.exports = Alert;