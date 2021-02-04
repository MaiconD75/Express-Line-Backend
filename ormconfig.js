require('dotenv/config');

const dbconfig =
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: '__tests__/database.sqlite',
      }
    : {
        type: 'postgres',
        host: 'localhost',
        username: 'postgres',
        password: 'docker',
        database: 'expressline',
        port: 5432,
      };

module.exports = {
  ...dbconfig,
  entities: ['./src/app/data/models/*.ts'],
  migrations: ['./src/database/migrations/*ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
