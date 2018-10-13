const path = require('path')

module.exports = {
  [process.env.NODE_ENV]: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../db.sqlite')
  },
  test: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../test.sqlite')
  }
}
