const TemperaturesController = require('./controllers/temperatures')

function DB () {
  const Temperatures = TemperaturesController()

  return {
    Temperatures
  }
}

module.exports = DB
