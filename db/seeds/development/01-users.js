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
          username: 'Lou',
          email: 'lou@news.com',
          password: hash,
          date_of_birth: '09-09-1985',
          gender: 'male',
          goal_weight: 230,
          activity_level: 1.375,
          dietary_preference: 2,
          feet: null,
          inches: null,
          pounds: null,
          centimeters: 200,
          kilograms: 260,
          created_at: '2020-06-17 07:56:00',
          updated_at: '2020-06-17 07:56:00',
        },
      ]);
    });
};
