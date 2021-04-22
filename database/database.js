const sequelize = require("sequelize");

const connection = new sequelize("capyba_desafio", 'fernando', 'Hertz94773195', {
  host: 'localhost',
  dialect: 'mysql'
})


module.exports = connection;
