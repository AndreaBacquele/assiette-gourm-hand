const express = require('express');
const db = require('./db');
const app = express();
const port = 4000;


// Définition des routes
app.get('/', (req, res) => {
  // res.send(`User: ${env.DB_USER}, Password: ${env.DB_PASSWORD}, Host: ${env.DB_HOST}, Port: ${env.DB_PORT}`);
  res.send('Hello World!')
});

app.get('/test-db-connection', async (req, res) => {
  try {
    const client = await db.connect(); // Tente de se connecter à la base de données
    const result = await client.query('SELECT NOW()'); // Exécute une requête simple pour tester
    res.send(`La connexion à la base de données a réussi. Temps actuel : ${result.rows[0].now}`);
  } catch (err) {
    console.error('Erreur lors de la connexion à la base de données:', err);
    res.status(500).send('Impossible de se connecter à la base de données.');
  }
});

app.get('/jury', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jury');
    res.json(result.rows); // Renvoie les données de jury au client
  } catch (error) {
    console.error(error);  
    res.status(500).send('Une erreur est survenue lors de la récupération des données de jury.'); // Gère les erreurs
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});