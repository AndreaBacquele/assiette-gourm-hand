const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const CriteriaNotes = sequelize.define(
  "CriteriaNotes",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
    },
    type_epreuve_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "type_epreuve",
        key: "id",
      },
    },
  },
  {
    tableName: "criteria_notes",
  }
);

CriteriaNotes.associate = (models) => {
  CriteriaNotes.belongsTo(models.TypeEpreuve, {
    foreignKey: "type_epreuve_id",
    as: "typeEpreuve", // alias pour accéder au modèle lié
  });
};

// `sequelize.define` also returns the model
console.log(CriteriaNotes === sequelize.models.CriteriaNotes); // true
