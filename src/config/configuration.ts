export default () => ({
  app: {
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    port: process.env.APP_PORT,
  },
  jwt: {
    secret: 'jwt-secret',
  },
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_POST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
});
