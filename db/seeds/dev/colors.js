const colorsData = require('../../colorsData')

const createProject = (knex, project) => {
  return knex('projects').insert({
    project_name: project.project_name
  }, 'project_id')
    .then(projectId => {
      let palettePromises = []

      project.palettes.forEach(palette => {
        palettePromises.push(
          createPalette(knex, {
            palette_name: palette.palette_name,
            color_1: palette.color_1,
            color_2: palette.color_2,
            color_3: palette.color_3,
            color_4: palette.color_4,
            color_5: palette.color_5,
            project_id: projectId[0]
          })
        )
      })
      return Promise.all(palettePromises)
    })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette)
}

exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = []
      colorsData.forEach(project => {
        projectPromises.push(createProject(knex, project))
      })
      return Promise.all(projectPromises)
    })
    .catch(error => console.log(`Error seeding data ${error}`))
}