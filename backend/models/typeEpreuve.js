const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const TypeEpreuve = sequelize.define(
  "type_epreuve",
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

console.log(TypeEpreuve === sequelize.models.TypeEpreuve);
