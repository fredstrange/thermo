import App from './server/app.js'
import config from './config.json' assert { type: 'json' }

async function run() {
  const dev = process.env.NODE_ENV !== 'production'
  const app = await App({ dev, ...config })

  app.listen(config.port)
}

run()
