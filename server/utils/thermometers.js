const five = require('johnny-five')
const R = require('ramda')
const mockFirmata = require('mock-firmata')
const Thermometer = require('./thermometer')

const indexBy = (key, list) => R.zipObj(R.pluck(key, list), R.values(list))

function Thermometers (devices = []) {
  const board = new five.Board({
    io: new mockFirmata.Firmata(),
    debug: false,
    repl: false
  })

  const thermometers = devices.map(device => Thermometer({ board, ...device }))
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
