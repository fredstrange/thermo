const isPi = require('./isPi')

describe('should read from process.arch', () => {
  describe('When the arch is ARM', () => {
    beforeAll(function () {
      this.originalPlatform = process.platform
      Object.defineProperty(process, 'arch', {
        value: 'armv6'
      })
    })

    afterAll(function () {
      Object.defineProperty(process, 'arch', {
        value: this.originalPlatform
      })
    })

    it('should be a Raspberry Pi', () => {
      expect(isPi()).toBeTruthy()
    })
  })

  describe('When the arch is ARM', () => {
    beforeAll(function () {
      this.originalPlatform = process.platform
      Object.defineProperty(process, 'arch', {
        value: 'x64'
      })
    })

    afterAll(function () {
      Object.defineProperty(process, 'arch', {
        value: this.originalPlatform
      })
    })

    it('should be a Raspberry Pi', () => {
      expect(isPi()).toBeFalsy()
    })
  })
})
