const express = require('express');
const db = require('./db');
const app = express();
const port = 4000;
const cors = require('cors')
const bcrypt = require('bcrypt')

app.use(express.json());
app.use(cors());


// Définition des routes
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/test-db-connection', async (req, res) => {
  try {
    const client = await db.connect(); 
    const result = await client.query('SELECT NOW()'); 
    res.send(`La connexion à la base de données a réussi. Temps actuel : ${result.rows[0].now}`);
  } catch (err) {
    console.error('Erreur lors de la connexion à la base de données:', err);
    res.status(500).send('Impossible de se connecter à la base de données.');
  }
});

app.get('/jury', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jury');
    res.json(result.rows); 
  } catch (error) {
    console.error(error);  
    res.status(500).send('Une erreur est survenue lors de la récupération des données de jury.'); 
  }
});

app.post('/add-to-jury', async (req, res) => {
  try {
    const { nom } = req.body; 

    const text = `
      INSERT INTO jury (nom)
      VALUES ($1)
      RETURNING *;`; 

    const result = await db.query(text, [nom]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Une erreur est survenue lors de l\'ajout d\'un membre au jury.');
  }
});



app.get('/type_epreuve', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM type_epreuve');
    res.json(result.rows); 
  } catch (error) {
    console.error(error);  
    res.status(500).send('Une erreur est survenue lors de la récupération des données de type_epreuve.'); 
  }
});

app.get('/notes_criteria', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM notes_criteria');
    res.json(result.rows); 
  } catch (error) {
    console.error(error);  
    res.status(500).send('Une erreur est survenue lors de la récupération des données de criteria_notes.'); 
  }
});

app.get('/notes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM notes');
    res.json(result.rows); 
  } catch (error) {
    console.error(error);  
    res.status(500).send('Une erreur est survenue lors de la récupération des données de criteria_notes.'); 
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});