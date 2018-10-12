const Sequelize = require('sequelize')
const config = require('./config')
const TemperaturesController = require('./controllers/temperatures')

function DB (sequelize) {
  const c = config[process.env.NODE_ENV]
  console.log(c)
  const db = sequelize || new Sequelize(config[process.env.NODE_ENV])
  const Temperatures = TemperaturesController(db)

  return {
    db,
    Temperatures
  }
}

module.exports = DB
