const R = require('ramda')
const Thermometer = require('./thermometer')

const indexBy = (key, list) => R.zipObj(R.pluck(key, list), R.values(list))

function Thermometers (devices = [], Temperatures) {
  const thermometers = devices.map(device =>
    Thermometer({ address: device.address, Temperatures })
  )
  const devicesObject = indexBy('address', devices)

  async function getTemperatures () {
    const data = await Promise.all(
      thermometers.map(thermometer => thermometer.data())
    )

    return data.reduce((obj, thermometer) => {
      const { temperature, address } = thermometer
      const { index, group, label } = devicesObject[address]

      obj[group] = obj[group] || []
      obj[group][index] = { temperature, label }
      return obj
    }, {})
  }

  return { getTemperatures }
}

module.exports = Thermometers
