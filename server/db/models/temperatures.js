const Sequelize = require('sequelize')

const Temperatures = (sequelize, DataTypes) =>
sequelize.define('Temperatures', {
    address: DataTypes.STRING,
    temperature: DataTypes.FLOAT
  })

module.exports = Temperatures
