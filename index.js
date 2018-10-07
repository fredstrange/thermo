const App = require('./app')
const config = require('./config.json')

async function run () {
  const dev = process.env.NODE_ENV !== 'production'
  const app = await App(Object.assign({ dev }, config))

  console.log('foo')
  app.listen(3000)
}

run()
