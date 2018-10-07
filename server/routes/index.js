const AsyncRouter = require('express-async-router').AsyncRouter
const temperatures = require('./temperatues')

function routes ({ devices = [], groups = [] }) {
  const router = AsyncRouter()
  router.get('/temperatures', temperatures(devices, groups))

  return router
}

module.exports = routes
