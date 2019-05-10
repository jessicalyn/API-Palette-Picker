# API-Palette-Picker
Description of project...
This app is deployed to Heroku:

## API Documentation:

Welcome to the Palette Picker API! This documentation should familiarize you with the resources available and how to consume them with HTTP requests. 

### Root URL
The Root URL for Palette Picker is `https://palette-picker-mfjk.herokuapp.com/` The documentation below requires prepending the Root URL to the endpoints in order to fulfill the requests.

### Projects Endpoints
The Projects endpoints provide information about all the Projects in Palette Picker or a specific Project. You can also create, update, or delete a Project.

#### Endpoints:
- `/api/v1/projects` -- `GET` data for all Projects
- `/api/v1/projects/:id` -- `GET` data for a specific Project 
- `/api/v1/projects` -- `POST` add a new Project
- `/api/v1/projects/:id` -- `PUT` edit an existing Project
- `/api/v1/projects/:id` -- `DELETE` an existing Project

### Palettes Endpoints
The Palettes endpoints provide information about all the Palettes in Palette Picker or a specific Palette. You can also create, update, or delete a Palette.

#### Endpoints:
- `/api/v1/palettes` -- `GET` data for all Palettes
- `/api/v1/palettes/:id` -- `GET` data for a specific Palette 
- `/api/v1/palettes` -- `POST` add a new Palette
- `/api/v1/palettes/:id` -- `PUT` edit an existing Palette
- `/api/v1/palettes/:id` -- `DELETE` an existing Palette

