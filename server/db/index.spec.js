const DB = require('./index')

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

describe('Database', () => {

  describe('Temperature controller', async () => {
    it('Should create a temperature entry and return it', async () => {
      const address = 'asdfasdfas'
      const temperature = 24.654

      const resp = {}

      expect(resp).toEqual(expect.objectContaining({ temperature }))
    })

    it('Should return the latest of multiple entries', async () => {
      const address = 'multipleEntries'
      let temperature = 0

      const resp = {}
      expect(resp).toEqual(expect.objectContaining({ temperature: 10 }))
    })

    it('Should create a temperature entry and return it', async () => {
      const address = 'randomNonExistant'
      const resp = {}

      expect(resp).toEqual(expect.objectContaining({ temperature: 'N/A' }))
    })
  })
})
