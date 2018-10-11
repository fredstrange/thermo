const fsProm = require('fs').promises
const path = require('path')
const isPi = require('../utils/isPi')
const PI_PATH = '/sys/bus/w1'
const DEV_PATH = path.resolve(__dirname, '../fixtures')
const INTERVAL = 5000

function Thermometer ({ address }) {
  let celsius = 0
  let timer = null
  const devicePath = `${isPi()? PI_PATH : DEV_PATH}/devices/${address}/w1_slave`

  async function readTemperature () {
    const exists = await fsProm.stat(devicePath).catch(() => false)
    if (!exists) return

    try {
      const file = await fsProm.readFile(devicePath, { encoding: 'utf8' })
      const temperature = file.match(/(?:t=)(\d+)/)[1]
      celsius = temperature / 1000
    } catch (e) {
      console.log(e)
      console.log(`failed to open device file: ${address}`)
    } finally {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(readTemperature, INTERVAL)
    }
  }

  readTemperature()

  function data () {
    return {
      celsius,
      address
    }
  }

  return {
    data
  }
}

module.exports = Thermometer
