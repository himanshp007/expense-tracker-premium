const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const ForgotPasswordReset = sequelize.define('forgotpasswordreset', {

    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    
    isActive: Sequelize.BOOLEAN,
    userId: Sequelize.INTEGER,
})

module.exports = ForgotPasswordReset;