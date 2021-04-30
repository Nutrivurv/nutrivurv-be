// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/auth.db6',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './db/seeds' },
  },
  useNullAsDefault: true,
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
