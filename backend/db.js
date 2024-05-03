const { Pool } = require('pg');
const { env } = require('process');

const pool = new Pool({
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'assiette-gourmhand'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};