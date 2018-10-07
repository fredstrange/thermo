const Thermometers = require('../utils/thermometers')

function Temperatures (devices = [], groups = []) {
  const thermometers = Thermometers(devices)

  return (req, res) => {
    const temperatures = thermometers.getTemperatures()

    res.json({ groups, temperatures })
  }
}
module.exports = Temperatures
