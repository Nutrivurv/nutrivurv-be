exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name');
    table.string('email').unique();
    table.string('password');
    table.date('date_of_birth');
    table.decimal('weight_kg', null);
    table.decimal('height_cm', null);
    table.enum('gender', ['male', 'female']);
    table.decimal('target_weight_lbs', null);
    table.decimal('activity_level', null, 3);
    table.integer('net_weekly_weight_change_kg');
    // default USDA reccomended macronutrient ratios
    table.decimal('fat_ratio_prct', null).default(0.25);
    table.decimal('carb_ratio_prct', null).default(0.5);
    table.decimal('protein_ratio_prct', null).default(0.25);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
