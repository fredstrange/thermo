const Thermometers = require('../lib/thermometers')

function Temperatures (devices = [], groups = [], Temperatures) {
  const thermometers = Thermometers(devices, Temperatures)

  return async (req, res) => {
    const temperatures = await thermometers.getTemperatures()
    console.log(temperatures)

    res.json({ groups, temperatures })
  }
}
module.exports = Temperatures
