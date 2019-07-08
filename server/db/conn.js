const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/aqi-twilio-alert-app', { logging: false });


module.exports = conn;