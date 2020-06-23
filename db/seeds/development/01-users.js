const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync(process.env.USER, 10);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 0,
          name: 'Lou',
          email: 'lou@news.com',
          password: hash,
        },
      ]);
    });
};
