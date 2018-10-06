const AsyncRouter = require('express-async-router').AsyncRouter
const temperatures = require('./temperatues')

function routes ({ pins = [] }) {
  const router = AsyncRouter()
  router.get('/temperatures', temperatures(pins))

  return router
}

module.exports = routes
