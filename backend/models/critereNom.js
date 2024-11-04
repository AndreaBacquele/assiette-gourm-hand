// TODO
import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

const CritereLabel = sequelize.define(
  "CritereLabel",
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
    type_epreuve_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "critere_label",
  }
);
