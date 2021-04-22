const Sequelize = require('sequelize');
const connection = require("../database/database");
const User = require("../user/User");

const Documents = connection.define('documents', {
  cpf: {
    type: Sequelize.STRING,
    allowNull: true
  },
  rg: {
    type: Sequelize.STRING,
    allowNull: true
  },
  title:{
    type: Sequelize.STRING,
    allowNull: true
  },
  ctps:{
    type: Sequelize.STRING,
    allowNull: true
  },
  phone:{
    type: Sequelize.STRING,
    allowNull: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

})


Documents.sync({force: false});

module.exports = Documents;
