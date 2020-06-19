exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'Lou',
          email: 'lou@news.com',
          password: 'Abadpassword',
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
        {
          id: 2,
          username: 'stu',
          email: 'stu@news.com',
          password: 'AB3TT3rassword',
          date_of_birth: '10-10-1995',
          gender: 'male',
          goal_weight: 200,
          activity_level: 1.9,
          dietary_preference: 0,
          feet: 5,
          inches: 11,
          pounds: 240,
          centimeters: null,
          kilograms: null,
          created_at: '2020-06-17 07:57:00',
          updated_at: '2020-06-17 07:57:00',
        },
        {
          id: 3,
          username: 'Hugh',
          email: 'hugh@news.com',
          password: 'anotherpass',
          date_of_birth: '11-11-1973',
          gender: 'male',
          goal_weight: 180,
          activity_level: 1.55,
          dietary_preference: 1,
          feet: null,
          inches: null,
          centimeters: 160,
          kilograms: 200,
          created_at: '2020-06-17 07:59:00',
          updated_at: '2020-06-17 07:59:00',
        },
      ]);
    });
};
