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
      return response.status(422).send({
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