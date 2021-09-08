/* eslint-disable radix */
require('dotenv/config');

const dbconfig =
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: '__tests__/database.sqlite',
      }
    : {
        type: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
      };

module.exports = {
  ...dbconfig,
  entities: ['./src/app/data/models/*.ts'],
  migrations: ['./src/database/migrations/*ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
