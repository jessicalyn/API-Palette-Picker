# API-Palette-Picker
Description of project...
This app is deployed to Heroku:

## API Documentation:

Welcome to the Palette Picker API! This documentation should familiarize you with the resources available and how to consume them with HTTP requests. The documentation 

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

---
## GET `/palettes`
This endpoint retrieves data for all Palettes. 

#### Example Responses:

##### Status: 200 OK
```
  [
    {
        "palette_id": 1,
        "palette_name": "Earth Tones",
        "project_id": 1,
        "color_1": "#F1C231",
        "color_2": "#E69138",
        "color_3": "#44818E",
        "color_4": "#B46005",
        "color_5": "#F9CB9C",
        "created_at": "2019-05-09T19:19:55.831Z",
        "updated_at": "2019-05-09T19:19:55.831Z"
    },
    {
        "palette_id": 2,
        "palette_name": "Jungle Palette",
        "project_id": 1,
        "color_1": "#37761B",
        "color_2": "#990000",
        "color_3": "#44818E",
        "color_4": "#6BA84F",
        "color_5": "#0C343D",
        "created_at": "2019-05-09T19:19:55.836Z",
        "updated_at": "2019-05-09T19:19:55.836Z"
    }
  ]
```

## GET `/palettes/:id`
This endpoint retrieves data for a specific Palette, by id. 

#### Example Request:
`/palettes/1`

#### Example Responses:

##### Status: 200 OK
```
  [
    {
        "palette_id": 1,
        "palette_name": "Earth Tones",
        "project_id": 1,
        "color_1": "#F1C231",
        "color_2": "#E69138",
        "color_3": "#44818E",
        "color_4": "#B46005",
        "color_5": "#F9CB9C",
        "created_at": "2019-05-09T19:19:55.831Z",
        "updated_at": "2019-05-09T19:19:55.831Z"
    }
  ]
```

## POST `/palettes`
This endpoint adds a new palette. 

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
  { palette_id: 5 }
```

##### Status: 422 Unprocessable Entity
```
{
    "error": 
      "Expected format:
        palette_name: <String>,
        project_id: <Integer>,
        color_1: <String>,
        color_2: <String>,
        color_3: <String>,
        color_4: <String>,
        color_5: <String>.
        You are missing a "project_id""
}
```

--------------

## GET `/projects`
This endpoint grabs all existing projects in the database.

#### Example Responses

##### Status: 200 OK

```
[
    {
        "project_id": 5,
        "project_name": "Fitness App",
        "created_at": "2019-05-09T14:30:12.804Z",
        "updated_at": "2019-05-09T14:30:12.804Z"
    },
    {
        "project_id": 4,
        "project_name": "Yoshi's Colors",
        "created_at": "2019-05-09T14:30:12.800Z",
        "updated_at": "2019-05-09T14:30:12.800Z"
    },
    {
        "project_id": 6,
        "project_name": "Louisa's Favorite Magentas",
        "created_at": "2019-05-10T20:59:55.362Z",
        "updated_at": "2019-05-10T20:59:55.362Z"
    }
]
```

## POST `/projects`
This endpoint adds a new project. 

### Request Body `application/json`
| Name | Type | Description | Required |
| --- | --- | --- | --- |
| palette_name| string | Name of Project | yes |
|

#### Example Request Body
```
  {
    "palette_name": "Bart's Colors", 
  }
```

#### Example Responses:

##### Status: 200 OK
```
  { palette_id: 6 }
```

##### Status: 422 Unprocessable Entity
```
{
    "error": "Missing required parameter. Expected format: { project_name: <String> }."
}
```
## PUT `/palettes/:id`
This endpoint updates an existing Palette, by id. 

### Request Body `application/json`
| Name | Type | Description | Required |
| --- | --- | --- | --- |
| palette_name | string | Name of Palette | no |
| project_id | integer | ID of Project | no |
| color_1 | string | HEX code for specific color | no |
| color_2 | string | HEX code for specific color | no |
| color_3 | string | HEX code for specific color | no |
| color_4 | string | HEX code for specific color | no |
| color_5 | string | HEX code for specific color | no |
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
  { "message": "Palette successfully updated." }
```

##### Status: 404 Not Found
```
  { "error": "Could not find a palette with id 1234." }
```

## DELETE `/palettes/:id`
This endpoint deletes an existing Palette, by id. 

#### Example Responses:

##### Status: 200 OK
```
  "Deleted palette with id 1"
```

##### Status: 422 Unprocessable Entity
```
  { "error": "Could not find palette with id 1234." }
```