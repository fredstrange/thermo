const express = require('express')
const next = require('next')
const apiRoutes = require('./routes')
const DB = require('./db')

const App = async ({ dev, devices, groups }) => {
  const server = express()
  const app = next({ dev })
  const webHandler = app.getRequestHandler()

  const db = DB()

  await app.prepare()
  server.use('/api', apiRoutes({ devices, groups, db }))
  server.get('*', webHandler)

  return server
}

module.exports = App
