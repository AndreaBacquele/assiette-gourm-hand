const express = require('express');
const db = require('./db');
const app = express();
const port = 4000;

// Fonction pour créer une table 'utilisateurs'
async function createJuryTable() {
  try {
    const query = `
      CREATE TABLE jury (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(100),
        mdp VARCHAR(100)
      );
    `;
    // Exécutez la requête
    const result = await db.query(query);
    console.log("La table 'jury' a été créée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la création de la table 'jury' :", error);
  }
}

// Appel de la fonction pour créer la table 'utilisateurs' au démarrage du serveur
createJuryTable();

// Définition des routes
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});