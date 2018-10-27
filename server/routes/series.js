const moment = require('moment')
const { pluck } = require('ramda')

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

        console.log(res[address])

        return res
      }, {})
    )

    console.log('data', data)

    res.json({ data })
  }
}
module.exports = Temperatures
