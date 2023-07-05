const { Sequelize } = require('sequelize');
require('dotenv').config();


const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } = process.env;


const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
});

console.log('DB_NAME', DB_NAME);

module.exports = db;
