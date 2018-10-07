const server = require('express')()
const next = require('next')
const apiRoutes = require('./server/routes')

const App = async ({ dev, devices }) => {
  const app = next({ dev })
  const webHandler = app.getRequestHandler()

  await app.prepare()
  server.use('/api', apiRoutes({ devices }))
  server.get('*', webHandler)

  return server
}

module.exports = App
