// Update with your config settings.
require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations/',
    },
    seeds: {
      directory: './db/seeds/development/',
    },
    useNullAsDefault: true,
  },

  testing: {
    client: 'pg',
    connection: process.env.TEST_DB_URL + '?ssl=true',
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations/',
    },
    seeds: {
      directory: './db/seeds/testing/',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: process.env.PROD_DB_URL + '?ssl=true',
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations/',
    },
    seeds: {
      directory: './db/seeds/production/',
    },
    useNullAsDefault: true,
  },
};
