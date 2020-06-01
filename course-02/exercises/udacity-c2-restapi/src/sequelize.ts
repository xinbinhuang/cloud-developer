import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const db_c = config.db;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": db_c.username,
  "password": db_c.password,
  "database": db_c.database,
  "host":     db_c.host,

  dialect: db_c.dialect,
});

