exports.up = function (knex) {
  return knex.createTable('users', (table) => {
    // userID
    table.increments('userID');
    // name
    table.string('name', 64);
    // email
    table.string('name', 254);
    // password
    table.string('password', 16);
  });
};

exports.down = function (knex) {
  return knex.dropTableIfExists('users');
};
