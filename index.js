const App = require('./server/app')
const config = require('./config.json')

async function run () {
  const dev = process.env.NODE_ENV !== 'production'
  const app = await App({ dev, ...config})

  app.listen(3000)
}

run()
