function TemperaturesController (db) {
  const Temperatures = db.import('../models/temperatures.js')

  async function create ({ address, temperature }) {
    console.log(address, temperature)

    return await Temperatures.create({
      address,
      temperature
    })
  }

  async function findLatest (address) {
    const response = await Temperatures.find({
      where: {
        address
      },
      limit: 1,
      attributes: ['temperature'],
      order: [['createdAt', 'DESC']]
    })

    return response ? response.get({ plain: true }) : { temperature: 'N/A' }
  }

  return {
    create,
    findLatest
  }
}

module.exports = TemperaturesController
