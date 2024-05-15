const express = require('express');
const db = require('./db');
const app = express();
const port = 4000;

// Définition des routes
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});