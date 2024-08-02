const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize')

const Jury = sequelize.define(
  'Jury',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
        },
    name: {
      type: DataTypes.STRING,
    },
    mdp:{
      type: DataTypes.STRING
    },
    type_epreuve_id: {
      type: DataTypes.INTEGER
    }
  },
  {
     tableName: 'Jury'
  },
);

// `sequelize.define` also returns the model
console.log(Jury === sequelize.models.Jury); // true