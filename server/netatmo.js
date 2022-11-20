import axios from 'axios'
import MetricsClient from './utils/promethius-client.js'
import authInterceptor from './utils/oauth_interceptor.js'

const attributes = [
  'Temperature',
  'CO2',
  'Humidity',
  'Noise',
  'Pressure',
  'AbsolutePressure',
]

const netatmoClient = axios.create({
  baseURL: 'https://api.netatmo.com/',
  headers: { accept: 'application/json' },
})

netatmoClient.interceptors.request.use(authInterceptor)

export default function initNetatmo(netatmo_poll_intervall) {
  let timer
  const weatherData = new MetricsClient.Gauge({
    name: 'weatherstation',
    help: 'Metrics from weather station',
    labelNames: ['unit', 'metric'],
  })

  function poll() {
    readNetatmo()

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(poll, netatmo_poll_intervall)
  }

  poll()

  async function readNetatmo() {
    try {
      const resp = await netatmoClient.get(
        'api/getstationsdata?get_favorites=false'
      )

      const mainDevice = resp.data.body.devices[0]
      const inData = mainDevice.dashboard_data
      const outData = mainDevice.modules[0].dashboard_data

      Object.keys(inData).forEach((metric) => {
        if (attributes.includes(metric)) {
          weatherData.labels({ unit: 'indoor', metric }).set(inData[metric])
        }
      })

      Object.keys(outData).forEach((metric, value) => {
        if (attributes.includes(metric)) {
          weatherData.labels({ unit: 'outdoor', metric }).set(outData[metric])
        }
      })
    } catch (error) {
      console.log('failed to request weather data.')
    }
  }
}
