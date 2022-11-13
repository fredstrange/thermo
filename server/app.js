import express from 'express'
import apiRoutes from './routes/index.js'
import { initThermometers } from './temperature/index.js'

const App = async ({ dev, devices, groups, poll_intervall }) => {
  const server = express()

  initThermometers(devices, poll_intervall)

  server.use('/api', apiRoutes({ devices, groups }))

  return server
}

export default App
