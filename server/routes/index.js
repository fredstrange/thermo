import { AsyncRouter } from 'express-async-router'
import metricsMiddleware from './metrics.js'
import temperatures from './temperatues.js'

function routes() {
  const router = AsyncRouter()

  router.get('/metrics', metricsMiddleware)
  router.get('/temperatures', temperatures)

  return router
}

export default routes
