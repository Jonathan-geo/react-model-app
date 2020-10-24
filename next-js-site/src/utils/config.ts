import convict from 'convict';
import dotenv from 'dotenv';

dotenv.config();

export const config = convict({
  db: {
    database: {
      doc: 'Database name',
      default: 'db.name',
      env: 'DB_DATABASE'
    },
    host: {
      doc: 'Database host',
      default: 'db.example.com',
      env: 'DB_HOST'
    },
    username: {
      doc: 'Database authenticating username',
      default: 'admin',
      sensitive: true,
      env: 'DB_USERNAME'
    },
    password: {
      doc: 'Database authenticating password',
      default: 's3cret',
      sensitive: true,
      env: 'DB_PASSWORD'
    }
  }
});
