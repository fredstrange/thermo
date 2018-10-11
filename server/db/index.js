const Sequelize = require('sequelize')

function DB (path) {
  const db = new Sequelize(`sqlite:${path}`)
  const Temperatures = db.import('./models/temperatures.js')

  return {
    db,
    Temperatures
  }
}

module.exports = DB
