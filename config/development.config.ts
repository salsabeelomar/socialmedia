/ eslint-disable complexity /;
import { Dialect } from 'sequelize/types';

export const config = () => ({
  database: {
    dialect: 'mysql' as Dialect,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'Salsabeel123!',
    database: process.env.DB_NAME || 'SocialMedia',
    port: parseInt(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST || 'localhost',
  },
});
