const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    totalExpense: {
        type:Sequelize.INTEGER
    },
    ispremiumuser: Sequelize.BOOLEAN
});


module.exports = User;