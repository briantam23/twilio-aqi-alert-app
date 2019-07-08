const conn = require('../conn');


const User = conn.define('user', {
    id: {
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type: conn.Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    /* phoneNumber: {
        type: conn.Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1000000000,
            max: 9999999999
        }
    } */
})


module.exports = User;