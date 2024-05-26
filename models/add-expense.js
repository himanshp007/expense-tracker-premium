const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Expense = sequelize.define('expense', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    description: Sequelize.STRING,
    category: Sequelize.STRING
});

module.exports = Expense;