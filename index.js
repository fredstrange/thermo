const server = require('express')()
const next = require('next')

const apiRoutes = require('./server/routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const webHandler = app.getRequestHandler()

app.prepare().then(() => {
  server.use('/api', apiRoutes({ pins: [2] }))
  server.get('*', webHandler)

  server.listen(3000)
})
