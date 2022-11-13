import { promises as fsProm } from 'fs'
import { resolve } from 'path'
import isPi from '../utils/isPi.js'
const PI_PATH = '/sys/bus/w1'
const DEV_PATH = 'server/fixtures'
const tempRegx = /t=(\d+)/
const NOOP = () => {}

async function readTemperature(address) {
  const devicePath = `${
    isPi() ? PI_PATH : DEV_PATH
  }/devices/${address}/w1_slave`
  const exists = await fsProm.stat(devicePath) //.catch(NOOP)

  if (exists) {
    try {
      const file = await fsProm.readFile(devicePath, { encoding: 'utf8' })
      const temperature = tempRegx.exec(file)[1] / 1000
      return temperature
    } catch (e) {
      console.log(`failed to open device file: ${address}`, e)
    }
  }
}

export default { readTemperature }
