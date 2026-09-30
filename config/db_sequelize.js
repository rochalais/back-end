const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  '123456',
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.plano = require('../models/plano.js')(sequelize, Sequelize);

module.exports = db;