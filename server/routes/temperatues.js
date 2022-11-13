import client from 'prom-client'

function temperatures(req, res, next) {
  const temperatures = client.register.getSingleMetric('temperature')

  res.json(temperatures.hashMap)
}
export default temperatures
