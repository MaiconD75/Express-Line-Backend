export default process.env.NODE_ENV === 'test'
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
      port: process.env.DB_PORT,
    };
