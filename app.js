const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  response.send('Welcome to our Palette Picker')
});

// Palette Endpoints
app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then(palettes => {
      response.status(200).json(palettes)
    })
    .catch(error => {
      response.status(500).json({
        error
      })
    })
});

app.get('/api/v1/palettes/:id', (request, response) => {
  const reqId = request.params.id
  database('palettes').where('palette_id', reqId).select()
    .then(palette => {
      if (palette.length) {
        response.status(200).json(palette)
      } else {
        response.status(404).json(`Palette with id ${reqId} was not found`)
      }
    })
    .catch(error => {
      response.status(500).json({
        error
      })
    })
});

app.post('/api/v1/palettes', (request, response) => {
  const newPalette = request.body

  for(let requiredParameters of ['palette_name', 'project_id', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5']) {
    if (newPalette[requiredParameters] === undefined) {
      return response.status(422).json({ error: `Expected format: palette_name: <String>, project_id: <Integer>, color_1: <String>, color_2: <String>, color_3: <String>, color_4: <String>, color_5: <String>. You are missing a "${requiredParameters}"`})
    }
  }
      database('palettes').insert(newPalette, 'palette_id')
        .then(paletteId => {
          return response.status(201).json({ palette_id: paletteId[0] })
        })
        .catch(error => {
          return response.status(500).json({ error })
    })
  });

app.put('/api/v1/palettes/:id', (request, response) => {
  const existingPalette = database('palettes').where('palette_id', request.params.id).select()
  const updatedPalette = request.body
  database('palettes')
    .where('palette_id', request.params.id)
    .update({ 
      palette_name: updatedPalette.palette_name || existingPalette.palette_name,
      project_id: updatedPalette.project_id || existingPalette.project_id,
      color_1: updatedPalette.color_1 || existingPalette.color_1,
      color_2: updatedPalette.color_2 || existingPalette.color_2,
      color_3: updatedPalette.color_3 || existingPalette.color_3,
      color_4: updatedPalette.color_4 || existingPalette.color_4,
      color_5: updatedPalette.color_5 || existingPalette.color_5,
    }) 
      .then(palette => {
        if (palette) {
          response.status(200).json({
            message: 'Palette successfully updated.'
          })
        } else {
          response.status(404).json({
            error: `Could not find a palette with id ${request.params.id}.`
          })
        }
      })
      .catch(error => {
        response.status(500).json({ error })
      })
});

app.delete('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('palette_id', request.params.id).del()
    .then(res => {
      if (res > 0) {
        response.status(200).json(`Deleted palette with id ${request.params.id}`)
      } else {
        response.status(422).json({
          error: `Could not find palette with id ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});
  
//Project Endpoints
app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then(projects => {
      response.status(200).json(projects)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.get('/api/v1/projects/:id', (request, response) => {
  const reqId = request.params.id
  database('projects').where('project_id', reqId).select()
    .then(project => {
      if (project.length) {
        response.status(200).json(project)
      } else {
        response.status(404).json({ error: `Could not find project with id ${reqId}`})
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body

  for (let requiredParameter of ['project_name']) {
    if (!project[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter. Expected format: { project_name: <String> }.`
      })
    }
  }
  database('projects').insert(project, 'project_id')
    .then(project => {
      response.status(201).json({ project_id: project[0] })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error })
    })
});

app.delete('/api/v1/projects/:id', (request, response) => {
  database('palettes').where('project_id', request.params.id).select().del()
    .then(() => database('projects').where('project_id', request.params.id).select().del())
    .then(project => {
      if (project) {
        response.sendStatus(204)
      } else {
        response.status(404).json({
          error: `We could not find a project with an id of ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.put('/api/v1/projects/:id', (request, response) => {
  const update = request.body;
  if(!update.project_name){
    response.status(422).send({
      error: `Missing required parameter. Expected format: { project_name: <String> }`
    })
  } else {
    database('projects').where('project_id', request.params.id).select()
      .update({ project_name: update.project_name }, ['project_name'])
      .then(project => {
        if (project.length) {
          response.status(200).json({
            message: `Project name successfully updated to ${project_name}.`})
        } else {
          response.status(404).json({
            error: `Could not find a project with id ${request.params.id}.`
          })
        }
      })
      .catch(error => {
        response.status(500).json({ error })
      })
  }
});

module.exports = app
