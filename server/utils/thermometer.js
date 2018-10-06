const five = require('johnny-five')
const mockFirmata = require('mock-firmata')

function Thermometer (pin) {
  const board = new five.Board({
    io: new mockFirmata.Firmata(),
    debug: false,
    repl: false
  })
  let currentTemperature = 0

  board.on('ready', function () {
    const thermometer = new five.Thermometer({
      controller: 'DS18B20',
      pin
    })

    thermometer.on('change', function () {
      currentTemperature = this.celsius
      console.log(this.celsius + '°C')
    })
  })

  function currentTemp () {
    return currentTemperature
  }

  return {
    currentTemp
  }
}

module.exports = Thermometer
