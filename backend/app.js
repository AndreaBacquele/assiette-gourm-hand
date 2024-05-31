const express = require("express");
const db = require("./db");
const app = express();
const port = 4000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

// Définition des routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test-db-connection", async (req, res) => {
  try {
    const client = await db.connect();
    const result = await client.query("SELECT NOW()");
    res.send(
      `La connexion à la base de données a réussi. Temps actuel : ${result.rows[0].now}`
    );
  } catch (err) {
    console.error("Erreur lors de la connexion à la base de données:", err);
    res.status(500).send("Impossible de se connecter à la base de données.");
  }
});

app.get("/jury", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM jury");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Une erreur est survenue lors de la récupération des données de jury."
      );
  }
});

// Register jury

app.post("/add-to-jury", async (req, res) => {
  try {
    const { nom, mdp, type_epreuve_id } = req.body;
    const saltRounds = 10;
    // const hashedMdp = await bcrypt.hash(mdp, saltRounds);

    const text = `
      INSERT INTO jury (nom, mdp, type_epreuve_id)
      VALUES ($1, $2, $3)
      RETURNING *;`;

    const result = await db.query(text, [nom, mdp, type_epreuve_id]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Une erreur est survenue lors de l'ajout d'un membre au jury.");
  }
});

// Login jury
// TODO : add token

app.post("/login-jury", async (req, res) => {
  try {
    const { nom, mdp } = req.body;
    const query = "SELECT * FROM jury WHERE nom = $1 AND mdp = $2";
    const values = [nom, mdp];

    const result = await db.query(query, values);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).send("Nom ou mot de passe incorrect");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Une erreur est survenue lors de l'authentification d'un membre au jury."
      );
  }
});
// Avec hashage du mot de passe
//     if (result.rows.length > 0) {
//       const user = result.rows[0];

//       // const match = await bcrypt.compare(mdp, user.mdp);
//       if (match) {
//         res.status(200).json(user);
//       } else {
//         res.status(401).send('Nom ou mot de passe incorrect');
//       }
//     } else {
//       res.status(401).send('Nom ou mot de passe incorrect');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Une erreur est survenue lors de l\'authentification.');
//   }
// });

app.get("/type_epreuve", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM type_epreuve");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Une erreur est survenue lors de la récupération des données de type_epreuve."
      );
  }
});

// GESTION DES NOTES

app.get("/notes_criteria", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM notes_criteria");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Une erreur est survenue lors de la récupération des données de criteria_notes."
      );
  }
});

app.get("/notes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM notes");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Une erreur est survenue lors de la récupération des données de notes."
      );
  }
});

// TODO : add the jury_id
app.post("/add-to-notes", async (req, res) => {
  try {
    const { note, criteria_name, candidat_id } = req.body;

    const text = `
      INSERT INTO notes (note, criteria_name, candidat_id)
      VALUES ($1, $2, $3)
      RETURNING *;`;

    const result = await db.query(text, [note, criteria_name, candidat_id]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur est survenue lors de l'ajout de la note.");
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
