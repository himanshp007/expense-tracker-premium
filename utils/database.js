const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense', 'root', 'Himansh@007', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;   