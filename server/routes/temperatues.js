const R = require('ramda')
const five = require('johnny-five')
const Thermometer = require('../utils/thermometer')
const mockFirmata = require('mock-firmata')

const indexBy = (key, list) => R.zipObj(R.pluck(key, list), R.values(list))

function Temperatures (devices = []) {
  const board = new five.Board({
    io: new mockFirmata.Firmata(),
    debug: false,
    repl: false
  })

  const thermometers = devices.map(device => Thermometer({ board, ...device }))
  const devicesObject = indexBy('address', devices)

  return (req, res) => {
    const data = thermometers.reduce((obj, thermometer) => {
      const { celsius, fahrenheit, address } = thermometer.data()
      const { index, group, label } = devicesObject[address]

      obj[group] = obj[group] || []
      obj[group][index] = { celsius, fahrenheit, label }
      return obj
    }, {})

    res.json(data)
  }
}
module.exports = Temperatures
