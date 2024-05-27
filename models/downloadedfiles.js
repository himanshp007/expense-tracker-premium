const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const DownloadedFiles = sequelize.define('downloadedfiles', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    url: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    userId: Sequelize.INTEGER
});

module.exports = DownloadedFiles;