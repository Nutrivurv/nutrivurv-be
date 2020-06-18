exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    // id
    table.increments();
    // name
    table.string('username', 64);
    // email
    table.string('email', 254);
    // password
    table.string('password', 16);
    // create_at & update_at timestamps
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
