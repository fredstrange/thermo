const request = require('supertest')
const App = require('../app')
const config = require('../../config.json')
const isoDateString = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

describe('Temperature API endpoint', () => {
  let app

  beforeEach(async () => {
    app = await App({
      dev: 'test',
      ...config
    })
  })

  it('should contain groups', async () => {
    const resp = await request(app)
      .get('/api/temperatures')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(resp.body).toEqual(
      expect.objectContaining({
        groups: [
          {
            id: 'left_tank',
            type: 'tank',
            label: 'Left tank'
          },
          {
            id: 'right_tank',
            type: 'tank',
            label: 'Right tank'
          },
          {
            id: 'furnace',
            type: 'furnace',
            label: 'Wood stove'
          }
        ]
      })
    )
  })

  it('should contain temperatues', async () => {
    const resp = await request(app)
      .get('/api/temperatures')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(resp.body.temperatures).toEqual(
      expect.objectContaining({
        left_tank: [
          {
            temperature: 27.312,
            label: 'Bottom',
            createdAt: expect.stringMatching(isoDateString)
          },
          {
            temperature: 26.412,
            label: 'Middle',
            createdAt: expect.stringMatching(isoDateString)
          },
          {
            temperature: 23.312,
            label: 'Top',
            createdAt: expect.stringMatching(isoDateString)
          }
        ]
      })
    )
  })
})
