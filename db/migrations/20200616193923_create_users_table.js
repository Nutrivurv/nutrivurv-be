exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    // id
    table.increments();
    // name
    table.string('username').notNullable().unique();
    // email
    table.string('email').notNullable().unique();
    // password
    table.string('password').notNullable();
    // date of birth
    table.date('date_of_birth').notNullable();
    // gender
    table.enu('gender', ['male', 'female', 'non-binary']).notNullable();
    // goal weight
    table.integer('goal_weight').notNullable();
    // activity level
    table.enu('activity_level', [1.375, 1.55, 1.725, 1.9]).notNullable();
    // diertary preference
    table.enu('dietary_preference', [0, 1, 2, 3]).notNullable();
    // height in imperial units
    table.integer('feet');
    table.integer('inches');
    // weight in imperial units
    table.integer('pounds');
    // height in metric
    table.integer('centimeters');
    // weight in metric
    table.integer('kilograms');
    // create_at & update_at timestamps
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
