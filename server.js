const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

const app = express()
const port = 3000
app.use(express.json())
app.get('/', (request, response) => {
  response.send('Hello World')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

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
  database('palettes').where('palette_id', request.params.id).select()
    .then(palette => {
      if (palette) {
        response.status(200).json(palette)
      } else {
        response.status(404).json(`Palette with id ${request.params.id} was not found`)
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
      response.status(422).json({ error: `Expected format: { palette_name: <String>}, project_id: <Integer>, color_1: <String>, color_2: <String>, color_3: <String>, color_4: <String>, color_5: <String>. You are missing a "${requiredParameter}"`})
    } else {
      database('palettes').insert(newPalette, 'palette_id')
        .then(palette => {
          response.status(201).json(palette)
        })
        .catch(error => {
          response.status(500).json({
            error
        })
      })
    }
  }
})
