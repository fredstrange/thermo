import MetricsClient from '../utils/promethius-client.js'
import Thermometer from './thermometer.js'

export function initThermometers(devices, poll_intervall = 30000) {
  let timer = null

  const temperatureHist = new MetricsClient.Gauge({
    name: 'temperature',
    help: 'The temperatures of the furnace',
    labelNames: ['label', 'group', 'index'],
  })

  const thermometers = devices.map((device) => {
    return Thermometer(device, temperatureHist)
  })

  function readTemperature() {
    thermometers.forEach((thermometer) => {
      thermometer.readTemperature()
    })

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(readTemperature, poll_intervall)
  }

  readTemperature()
}
