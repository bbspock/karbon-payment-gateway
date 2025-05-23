import { Sequelize } from 'sequelize-typescript';
import { Transaction } from '../models/transaction';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'karbon_payments',
  models: [Transaction],
  logging: false,
});
