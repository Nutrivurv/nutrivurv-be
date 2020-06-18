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
          created_at: '2020-06-17 07:56:00',
          updated_at: '2020-06-17 07:56:00',
        },
        {
          id: 2,
          username: 'stu',
          email: 'stu@news.com',
          password: 'AB3TT3rassword',
          created_at: '2020-06-17 07:57:00',
          updated_at: '2020-06-17 07:57:00',
        },
        {
          id: 3,
          username: 'Hugh',
          email: 'hugh@news.com',
          password: 'anotherpass',
          created_at: '2020-06-17 07:59:00',
          updated_at: '2020-06-17 07:59:00',
        },
      ]);
    });
};
