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
db.aluno = require('../models/aluno.js')(sequelize, Sequelize);
db.treino = require('../models/treino.js')(sequelize, Sequelize);

db.plano.hasMany(db.aluno, {foreignKey: 'planoId'});
db.aluno.belongsTo(db.plano, {foreignKey: 'planoId'});

db.aluno.hasMany(db.treino, {foreignKey: 'alunoId'});
db.treino.belongsTo(db.aluno, {foreignKey: 'alunoId'});

module.exports = db;