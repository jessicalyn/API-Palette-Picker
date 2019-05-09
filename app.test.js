import app from './app'
import request from 'supertest'
import colorsData from './db/colorsData'
import '@babel/polyfill'

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile.js')[environment]
const database = require('knex')(configuration)

describe('/api/v1', () => {
  let server

  beforeAll(async () => {
    server = request(app)
  })

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

      const response = await server.get('/api/v1/palettes')
      const results = response.body

      expect(response.status).toBe(200)
      expect(results.length).toBe(expectedPalettesLength)
    })
  });

  describe('GET /palettes/:id', () => {
    it('should return a palette from the database by id', async () => {
      const expectedPalette = await database('palettes').first()
      const id = expectedPalette.palette_id
      
      const response = await server.get(`/api/v1/palettes/${id}`)
      const result = response.body[0]

      expect(response.status).toBe(200)
      expect(result.palette_name).toEqual(expectedPalette.palette_name)
    })

    it('should return status code 404 and error message if id does not exist', async () => {
      const expectedPalette = await database('palettes').first()
      const id = expectedPalette.palette_id - 1 

      const response = await server.get(`/api/v1/palettes/${id}`)
      
      expect(response.status).toBe(404)
      expect(response.body).toBe(`Palette with id ${id} was not found`)
    })
  });

  describe('POST /palettes', () => {
    it('should add a new palette in the database', async () => {
      const project = await database('projects').first()
      const projectId = project.project_id

      const newPalette = {
        palette_name: "Archie's Colors", 
        project_id: projectId, 
        color_1: "brown",
        color_2: "white",
        color_3: "dark brown", 
        color_4: "red",
        color_5: "black"
      }

      const response = await server.post('/api/v1/palettes').send(newPalette)
      const palettes = await database('palettes').where('palette_id', response.body[0]).select()
      const palette = palettes[0]

      expect(response.status).toBe(201)
      expect(palette.palette_name).toBe(newPalette.palette_name)
    })

    it('should return status code 422 and error message if missing parameter', async () => {
      const project = await database('projects').first()
      const projectId = project.project_id

      const newPalette = {
        palette_name: "Archie's Colors",
        color_1: "brown",
        color_2: "white",
        color_3: "dark brown", 
        color_4: "red",
        color_5: "black"
      }

      const response = await server.post('/api/v1/palettes').send(newPalette)

      expect(response.status).toBe(422)
      expect(response.body).toStrictEqual({ error: 'Expected format: { palette_name: <String>}, project_id: <Integer>, color_1: <String>, color_2: <String>, color_3: <String>, color_4: <String>, color_5: <String>. You are missing a "project_id"'})
    })
  })

  describe('PUT /palettes/:id', () => {
    it('should update a current palette with any new values by id', async () => {
      const existingPalette = await database('palettes').first()
      console.log('existing palette', existingPalette)
      const updatedPalette = { palette_name: "Yoshi's Colors" }

      const response = await server.put(`/api/v1/palettes/${existingPalette.palette_id}`).send(updatedPalette)
      const palette = await database('palettes').where('palette_id', existingPalette.palette_id)

      expect(palette[0].palette_name).toEqual(updatedPalette.palette_name)
    })
  })


// Project Endpoints Tests
  describe('GET /projects', () => {
    it('should return all projects from the database',  async () => {
      const expectedProjectsLength = colorsData.length

      const response = await server.get('/api/v1/projects')
      const results = response.body

      expect(response.status).toBe(200)
      expect(results.length).toBe(expectedProjectsLength)
    })
  });
  
  describe('PUT /projects/:id', () => {
    it('should update a project name in the database by id', async () => {
      const existingProject = await database('projects').first()
      const updatedName = { project_name: "Classroom Colors" }

      const response = await server.put(`/api/v1/projects/${existingProject.project_id}`).send(updatedName)
      const project = await database('projects').where('project_id', existingProject.project_id)

      expect(project[0].project_name).toBe(existingProject.project_name)
    })
  })
})
