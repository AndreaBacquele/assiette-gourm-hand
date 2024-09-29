const { Pool } = require('pg');
const { env } = require('process');

require('dotenv').config({path : './.env'});

// Création d'un nouveau pool de connexions
const pool = new Pool({
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: 'assiette-gourmhand',
});

// Méthode pour obtenir une connexion active
async function connect() {
  const client = await pool.connect();
  return client;
}

// Méthode pour libérer une connexion active
function release(client) {
  client.release();
}

// Méthode pour exécuter des requêtes SQL
async function query(text, params) {
  const client = await pool.connect();
  const result = await client.query(text, params);
  release(client);
  return result;
}

module.exports = {
  connect,
  query,
  release,
};