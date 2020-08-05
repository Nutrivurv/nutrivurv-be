exports.up = function (knex) {
  return knex.schema.createTable('edamam_measurements', (table) => {
    table.increments();
    table
      .integer('log_entry_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('log_entry')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.string('measurement_uri').notNullable();
    table.string('measurement_name').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('edamam_measurements');
};
