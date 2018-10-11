const path = require('path')

console.log(process.env.NODE_ENV)

module.exports = {
  [process.env.NODE_ENV]: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../db.sqlite')
  }
}
