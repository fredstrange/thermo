const DB = require('./index')

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

describe('Database', () => {
  let db
  beforeEach(() => {
    db = DB()
  })

  describe('Temperature controller', async () => {
    it('Should create a temperature entry and return it', async () => {
      const address = 'asdfasdfas'
      const temperature = 24.654

      await db.Temperatures.create({
        address,
        temperature
      })

      const resp = await db.Temperatures.findLatest(address)

      expect(resp).toEqual(expect.objectContaining({ temperature }))
    })

    it('Should return the latest of multiple entries', async () => {
      const address = 'multipleEntries'
      let temperature = 0

      await asyncForEach(Array(10).fill(0), async () => {
        await db.Temperatures.create({
          address,
          temperature: ++temperature
        })
      })

      const resp = await db.Temperatures.findLatest(address)
      expect(resp).toEqual(expect.objectContaining({ temperature: 10 }))
    })

    it('Should create a temperature entry and return it', async () => {
      const address = 'randomNonExistant'
      const resp = await db.Temperatures.findLatest(address)

      expect(resp).toEqual(expect.objectContaining({ temperature: 'N/A' }))
    })
  })
})
