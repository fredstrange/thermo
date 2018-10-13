const fsProm = require('fs').promises
const path = require('path')
const isPi = require('../utils/isPi')
const PI_PATH = '/sys/bus/w1'
const DEV_PATH = path.resolve(__dirname, '../fixtures')
const INTERVAL = 30000
const tempRegx = /t=(\d+)/

function Thermometer ({ address, Temperatures }) {
  let timer = null
  const devicePath = `${isPi() ? PI_PATH : DEV_PATH}/devices/${address}/w1_slave`

  async function readTemperature () {
    const exists = await fsProm.stat(devicePath).catch(() => false)
    if (!exists) return

    try {
      const file = await fsProm.readFile(devicePath, { encoding: 'utf8' })
      const temperature = tempRegx.exec(file)[1] / 1000

      await Temperatures.create({
        address,
        temperature
      })
    } catch (e) {
      console.log(`failed to open device file: ${address}`, e)
    } finally {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(readTemperature, INTERVAL)
    }
  }

  readTemperature()

  async function data () {
    const { temperature, createdAt } = await Temperatures.findLatest(address)

    return {
      temperature,
      createdAt,
      address
    }
  }

  return {
    data
  }
}

module.exports = Thermometer
