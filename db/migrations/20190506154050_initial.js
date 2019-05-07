exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function(table) {
      table.increments('project_id').primary();
      table.string('project_name');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('palettes', function(table) {
      table.increments('palette_id').primary();
      table.string('palette_name');
      table.integer('project_id').unsigned();
      table.string('color_1');
      table.string('color_2');
      table.string('color_3');
      table.string('color_4');
      table.string('color_5');
      table.foreign('project_id')
        .references('projects.project_id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('projects')
  ])
};
