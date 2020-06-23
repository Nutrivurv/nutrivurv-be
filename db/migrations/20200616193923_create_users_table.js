exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    // id
    table.increments();
    // name
    table.string('name');
    // email
    table.string('email').unique();
    // password
    table.string('password');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
