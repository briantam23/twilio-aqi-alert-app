const conn = require('../conn');


const User = conn.define('user', {
    id: {
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
    },
    githubUserId: {
        type: conn.Sequelize.INTEGER
    },
    githubUsername: {
        type: conn.Sequelize.STRING,
        unique: true
    },
    username: {
        type: conn.Sequelize.STRING,
        unique: true,
        /* allowNull: false,
        validate: {
            notEmpty: true
        } */
    },
    password: {
        type: conn.Sequelize.STRING,
        /* allowNull: false,
        validate: {
            notEmpty: true
        } */
    },
    phoneNumber: {
        type: conn.Sequelize.STRING,
        /* allowNull: false,
        validate: {
            notEmpty: true
        } */
    }
})


module.exports = User;