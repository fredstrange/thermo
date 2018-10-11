const R = require('ramda')
const Thermometer = require('./thermometer')

const indexBy = (key, list) => R.zipObj(R.pluck(key, list), R.values(list))

function Thermometers (devices = []) {
  const thermometers = devices.map(device => Thermometer(device))
  const devicesObject = indexBy('address', devices)

  function getTemperatures () {
    return thermometers.reduce((obj, thermometer) => {
      const { celsius, fahrenheit, address } = thermometer.data()
      const { index, group, label } = devicesObject[address]

      obj[group] = obj[group] || []
      obj[group][index] = { celsius, fahrenheit, label }
      return obj
    }, {})
  }

  return { getTemperatures }
}

module.exports = Thermometers
