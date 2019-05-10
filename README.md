# API-Palette-Picker
Description of project...
This app is deployed to Heroku:

## API Documentation:

Welcome to the Palette Picker API! This documentation should familiarize you with the resources available and how to consume them with HTTP requests. 

### Root URL
The Root URL for Palette Picker is `https://palette-picker-mfjk.herokuapp.com/api/v1` The documentation below requires prepending the Root URL to the endpoints in order to fulfill the requests.

### Projects Endpoints
The Projects endpoints provide information about all the Projects in Palette Picker or a specific Project. You can also create, update, or delete a Project.

#### Endpoints:
- `/projects` -- `GET` data for all Projects
- `/projects/:id` -- `GET` data for a specific Project 
- `/projects` -- `POST` add a new Project
- `/projects/:id` -- `PUT` edit an existing Project
- `/projects/:id` -- `DELETE` an existing Project

### Palettes Endpoints
The Palettes endpoints provide information about all the Palettes in Palette Picker or a specific Palette. You can also create, update, or delete a Palette.

#### Endpoints:
- `/palettes` -- `GET` data for all Palettes
- `/palettes/:id` -- `GET` data for a specific Palette 
- `/palettes` -- `POST` add a new Palette
- `/palettes/:id` -- `PUT` edit an existing Palette
- `/palettes/:id` -- `DELETE` an existing Palette

--------------

## POST `/palettes`
This endpoint adds a new palette. 

Required parameters: , '', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5'.

### Request Body `application/json`
| Name | Type | Description | Required |
| --- | --- | --- | --- |
| palette_name | string | Name of Palette | yes |
| project_id | integer | ID of Project | yes |
| color_1 | string | HEX code for specific color | yes |
| color_2 | string | HEX code for specific color | yes |
| color_3 | string | HEX code for specific color | yes |
| color_4 | string | HEX code for specific color | yes |
| color_5 | string | HEX code for specific color | yes |
|

#### Example Request Body
```
  {
    "palette_name": "Archie's Colors", 
    "project_id": 3, 
    "color_1": "#FFAB40",
    "color_2": "#4ECFE1",
    "color_3": "#EEFF41", 
    "color_4": "#F1C231",
    "color_5": "#CE5178"
  }
```

#### Example Responses:

##### Status: 200 OK
```
[
  { palette_id: 5 }
]
```