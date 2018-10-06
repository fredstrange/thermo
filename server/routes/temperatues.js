const Thermometer = require('../utils/thermometer')

function Temperatures (pins = []) {
  const thermometers = pins.map(Thermometer)

  console.log(thermometers)
  return (req, res) => {
    const data = thermometers.map(thermometer => ({
      temperature: thermometer.currentTemp()
    }))
    res.json(data)
  }
}
module.exports = Temperatures
