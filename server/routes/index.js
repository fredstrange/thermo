const AsyncRouter = require('express-async-router').AsyncRouter
const temperatures = require('./temperatues')

function routes ({ devices = [] }) {
  const router = AsyncRouter()
  router.get('/temperatures', temperatures(devices))

  return router
}

module.exports = routes
