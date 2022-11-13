import Prometheus from 'prom-client'

export default async function metricsMiddleware(req, res, next) {
  res.set('Content-Type', Prometheus.register.contentType)
  return res.end(await Prometheus.register.metrics())
}
