const five = require('johnny-five')

function Thermometer ({ pin, address, board }) {
  let celsius = 0
  let fahrenheit = 0

  board.on('ready', function () {
    const thermometer = new five.Thermometer({
      controller: 'DS18B20',
      pin,
      address
    })

    thermometer.on('change', function () {
      celsius = this.celsius
      fahrenheit = this.fahrenheit
      console.log(this.celsius + '°C')
    })
  })

  function data () {
    return {
      celsius,
      fahrenheit,
      address
    }
  }

  return {
    data
  }
}

module.exports = Thermometer
