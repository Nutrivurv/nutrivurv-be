exports.up = function (knex) {
  return knex.schema.createTable('log_entry', table => {
    table.increments();

    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.date('date').notNullable();
    table.enum('meal_type', ['breakfast', 'lunch', 'dinner', 'snack', 'water']).notNullable();
    table.string('edamam_food_id').notNullable();
    table.string('measurement_uri').notNullable();
    table.string('measurement_name').notNullable();
    table.string('food_name').notNullable();
    table.integer('quantity').notNullable();
    table.integer('calories_kcal').notNullable();
    table.decimal('fat_g').notNullable();
    table.decimal('carbs_g').notNullable();
    table.decimal('protein_g').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('log_entry');
};
