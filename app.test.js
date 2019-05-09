import app from './app'
import request from 'supertest'
import colorsData from './db/colorsData'
import '@babel/polyfill'

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile.js')[environment]
const database = require('knex')(configuration)

describe('/api/v1', () => {
  let server

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

  describe('GET /palettes/:id', () => {
    it('should return a palette from the database by id', async () => {
      const expectedPalette = await database('palettes').first()
      const id = expectedPalette.palette_id
      
      const response = await request(app).get(`/api/v1/palettes/${id}`)
      const result = response.body[0]

      expect(response.status).toBe(200)
      expect(result.palette_name).toEqual(expectedPalette.palette_name)
    })

    it('should return status code 404 and error message if id does not exist', async () => {
      const expectedPalette = await database('palettes').first()
      const id = expectedPalette.palette_id - 1 

      const response = await request(app).get(`/api/v1/palettes/${id}`)
      
      expect(response.status).toBe(404)
      expect(response.body).toBe(`Palette with id ${id} was not found`)
    })
  });

  describe('POST /palettes', () => {
    it('should add a new palette in the database', async () => {
      const project = await database('projects').first()
      const projectId = project.project_id

      const newPalette = {
        palette_name: "Yoshi's Colors",
        project_id: projectId, 
        color_1: "brown",
        color_2: "white",
        color_3: "dark brown", 
        color_4: "red",
        color_5: "black"
      }

      const response = await request(app).post('/api/v1/palettes').send(newPalette)
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

      const response = await request(app).post('/api/v1/palettes').send(newPalette)

      expect(response.status).toBe(422)
      expect(response.body).toStrictEqual({ error: 'Expected format: { palette_name: <String>}, project_id: <Integer>, color_1: <String>, color_2: <String>, color_3: <String>, color_4: <String>, color_5: <String>. You are missing a "project_id"'})
    })
  })

  describe('PUT /palettes/:id', () => {
    it('should update a current palette with any new values by id', async () => {
      const existingPalette = await database('palettes').first()
      const updatedPalette = { palette_name: "Yoshi's Colors" }

      const response = await request(app).put(`/api/v1/palettes/${existingPalette.palette_id}`).send(updatedPalette)
      const palette = await database('palettes').where('palette_id', existingPalette.palette_id)

      expect(palette[0].palette_name).toEqual(updatedPalette.palette_name)
    })

    it('should return a status code 404 if palette id not in database', async () => {
      const existingPalette = await database('palettes').first()
      const id = existingPalette.palette_id - 1
      const updatedPalette = { palette_name: "Buffy's Colors" }

      const response = await request(app).put(`/api/v1/palettes/${id}`).send(updatedPalette)

      expect(response.status).toBe(404)
      expect(response.body.error).toBe(`Could not find a palette with id ${id}.`)
    })
  })

  describe('DELETE /palettes/:id', () => {
    it('should delete a palette in the database by id', async () => {
      const existingPalette = await database('palettes').first()
      const id = existingPalette.palette_id
      
      const response = await request(app).delete(`/api/v1/palettes/${id}`)

      expect(response.status).toBe(200)
      expect(response.body).toBe(`Deleted palette with id ${id}`)
    })

    it('should return a status of 422 if the palette_id cannot be found', async () => {
      const existingPalette = await database('palettes').first()
      const id = existingPalette.palette_id - 1

      const response = await request(app).delete(`/api/v1/palettes/${id}`)

      expect(response.status).toBe(422)
      expect(response.body.error).toBe(`Could not find palette with id ${id}`)
    })
  });


// Project Endpoints Tests
  describe('GET /projects', () => {
    it('should return all projects from the database',  async () => {
      const expectedProjectsLength = colorsData.length

      const response = await request(app).get('/api/v1/projects')
      const results = response.body

      expect(response.status).toBe(200)
      expect(results.length).toBe(expectedProjectsLength)
    })
  });

  describe('GET /projects/:id', () => {
    it('should return a specific project by id', async () => {
      const expectedProject = await database('projects').first()
      const id = expectedProject.project_id

      const response = await request(app).get(`/api/v1/projects/${id}`)
      const result = response.body[0]

      expect(response.status).toBe(200)
      expect(result.project_name).toBe(expectedProject.project_name)
    })

    it('should return status code 404 and error message if id does not exist', async () => {
      const expectedProject = await database('projects').first()
      const id = expectedProject.project_id - 1

      const response = await request(app).get(`/api/v1/projects/${id}`)

      expect(response.status).toBe(404)
      expect(response.body.error).toBe(`Could not find project with id ${id}`)
    })
  });
  
  describe('PUT /projects/:id', () => {
    it('should update a project name in the database by id', async () => {
      const existingProject = await database('projects').first()
      const updatedName = { project_name: "Classroom Colors" }

      const response = await request(app).put(`/api/v1/projects/${existingProject.project_id}`).send(updatedName)
      const project = await database('projects').where('project_id', existingProject.project_id)

      expect(project[0].project_name).toBe(existingProject.project_name)
    })
  })

  describe('POST /projects', () => {
    it('should add a new project to the database', async () => {
      const newProject = { project_name: 'Paint the Vault' }
      
      const response = await request(app).post('/api/v1/projects').send(newProject)
      const projects = await database('projects').where('project_id', response.body.project_id).select()
      const project = projects[0]

      expect(response.status).toBe(201)
      expect(project.project_name).toBe(newProject.project_name)
    })

    it('should response with status code 422 if required parameter is missing', async() => {
      const newProject = { project_name: '' }
      
      const response = await request(app).post('/api/v1/projects').send(newProject)
      
      expect(response.status).toBe(422)
      expect(response.body.error).toBe('Missing required parameter. Expected format: { project_name: <String> }.')
    })
  });

  describe('DELETE /projects:id', () => {
    it('should delete a specific project by id', async () => {
      const existingProject = await database('projects').first()
      const id = existingProject.project_id

      const response = await request(app).delete(`/api/v1/projects/${id}`)

      expect(response.status).toBe(204)
    })
  })
})
