import app from './app'
import request from 'supertest'
import colorsData from './db/colorsData'
import '@babel/polyfill'

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile.js')[environment]
const database = require('knex')(configuration)

describe('/api/v1', () => {

  beforeEach(async () => {
    await database.seed.run()
  });

  // Palette Endpoints Tests
  describe('GET /palettes', () => {
    it('should return all palettes from the database', async () => {
      let expectedPalettesLength = 0
      const palettesNumber = colorsData.forEach(project => {
        expectedPalettesLength += project.palettes.length
      })

      const response = await request(app).get('/api/v1/palettes')
      const results = response.body

      expect(response.status).toBe(200)
      expect(results.length).toBe(expectedPalettesLength)
    })
  });

  describe('GET /projects', () => {
    it('should return all projects from the database',  async () => {
      const expectedProjectsLength = colorsData.length

      const response = await request(app).get('/api/v1/projects')
      const results = response.body

      expect(response.status).toBe(200)
      expect(results.length).toBe(expectedProjectsLength)
    })
  });
  
})