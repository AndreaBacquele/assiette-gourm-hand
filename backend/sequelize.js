const { Sequelize } = require('sequelize')
const env = require('process');

const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/assiette-gourmhand') 

async function connectToDatabase(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


module.exports = {
  sequelize,
  connectToDatabase
};