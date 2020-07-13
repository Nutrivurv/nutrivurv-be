exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.date('date_of_birth');
    // null specifies precision: https://knexjs.org/#Schema-decimal
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
  return knex.schema.table('users', (table) => {
    table.dropColumn('date_of_birth');
    table.dropColumn('weight_kg');
    table.dropColumn('height_cm');
    table.dropColumn('gender');
    table.dropColumn('target_weight_lbs');
    table.dropColumn('activity_level');
    table.dropColumn('net_weekly_weight_change_kg');
    table.dropColumn('fat_ratio_prct');
    table.dropColumn('carb_ratio_prct');
    table.dropColumn('protein_ratio_prct');
  });
};
