const path = require('path')
const server = require('express')()
const next = require('next')
const apiRoutes = require('./server/routes')
const DB = require('./server/db')

const App = async ({ dev, devices, groups }) => {
  const app = next({ dev })
  const webHandler = app.getRequestHandler()

  const db = DB(path.resolve(__dirname, './db.sqlite'))

  await app.prepare()
  server.use('/api', apiRoutes({ devices, groups, db }))
  server.get('*', webHandler)

  return server
}

module.exports = App
