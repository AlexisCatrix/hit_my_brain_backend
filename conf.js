const mysql = require("mysql2/promise");
require("dotenv").config();

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_SCHEMA,
  BACK_PORT,
  JWT_SALTROUNDS,
  JWT_SECRET,
} = process.env;

const db = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_SCHEMA,
});

module.exports = {
  db,
  backPort: BACK_PORT,
  jwt_rounds: parseInt(JWT_SALTROUNDS),
  jwt_secret: JWT_SECRET,
};