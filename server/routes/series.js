const moment = require('moment')
const { pluck, flatten } = require('ramda')

function Temperatures (devices = [], groups = [], Temperatures) {
  return async (req, res) => {
    const aDayAgo = moment().subtract(1, 'd').toDate()
    const addresses = pluck('address', devices)

    const data = await Promise.all(
      addresses.map(async address => {
        const res = await Temperatures.findRange({
          address,
          start: aDayAgo,
          end: new Date()
        })

        return res
      }, {})
    )

    const byAddress = flatten(data).reduce((acc, val) => {
      if (!acc[val.address]) acc[val.address] = []
      const time = new Date(val.createdAt).getTime()
      const temperature = val.temperature

      acc[val.address].push({
        time,
        temperature
      })

      return acc
    }, {})

    res.json(byAddress)
  }
}
module.exports = Temperatures
