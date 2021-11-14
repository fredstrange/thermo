
function TemperaturesController () {
  const Temperatures = {
    create: (data)=>{
      console.log(data);
      return Promise.resolve()
    },
    find: ()=>{Promise.resolve()},
    findAll: ()=>{Promise.resolve()}
  }

  async function create ({ address, temperature }) {
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
      attributes: ['temperature', 'createdAt'],
      order: [['createdAt', 'DESC']]
    })

    return response ? response.get({ plain: true }) : { temperature: 'N/A' }
  }

  async function findRange ({ address, start, end = new Date() }) {
    const response = await Temperatures.findAll({
      where: {
        address,
        createdAt: {
          ['between']: [new Date(start), new Date(end)]
        }
      },
      //   limit: 100,
      attributes: ['temperature', 'createdAt', 'address'],
      order: [['createdAt', 'DESC']]
    })

    return response
      ? response.map(resp => resp.get({ plain: true }))
      : { temperature: 'N/A' }
  }

  return {
    create,
    findLatest,
    findRange
  }
}

module.exports = TemperaturesController
