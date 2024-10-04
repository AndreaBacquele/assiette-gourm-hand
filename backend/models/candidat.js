const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Candidat = sequelize.define(
  "candidat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    libelle: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "type_epreuve",
  }
);
