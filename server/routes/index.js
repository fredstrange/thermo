const AsyncRouter = require('express-async-router').AsyncRouter
const temperatures = require('./temperatues')

function routes ({ devices = [], groups = [], db = {} }) {
  const router = AsyncRouter()
  router.get('/temperatures', temperatures(devices, groups, db.Temperatures))

  return router
}

module.exports = routes
