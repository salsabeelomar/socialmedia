import { registerAs } from '@nestjs/config';
require('dotenv').config();

export default registerAs('database', () => ({
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
}));
