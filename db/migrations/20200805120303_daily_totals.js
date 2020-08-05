exports.up = function (knex) {
  return knex.schema.createTable('daily_totals', (table) => {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.date('date').notNullable();
    table.integer('total_calories_kcal').defaultTo(0).notNullable();
    table.decimal('total_fat_g').defaultTo(0).notNullable();
    table.decimal('total_carbs_g').defaultTo(0).notNullable();
    table.decimal('total_protein_g').defaultTo(0).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('daily_totals');
};
