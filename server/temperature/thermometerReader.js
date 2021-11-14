const fsProm = require('fs').promises
const path = require('path')
const isPi = require('../utils/isPi')
const PI_PATH = '/sys/bus/w1'
const DEV_PATH = path.resolve(__dirname, '../fixtures')
const tempRegx = /t=(\d+)/
const NOOP = () => {}

async function readTemperature (address) {
  const devicePath = `${isPi() ? PI_PATH : DEV_PATH}/devices/${address}/w1_slave`
  const exists = await fsProm.stat(devicePath).catch(NOOP)

  if (exists) {
    try {
      const file = await fsProm.readFile(devicePath, { encoding: 'utf8' })
      const temperature = tempRegx.exec(file)[1] / 1000
    } catch (e) {
      console.log(`failed to open device file: ${address}`, e)
    }
  }

}

module.exports = { readTemperature }
