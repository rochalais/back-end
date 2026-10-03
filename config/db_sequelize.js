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
db.DataTypes = Sequelize.DataTypes;

db.plano = require('../models/plano.js')(sequelize, Sequelize);
<<<<<<< HEAD
db.aluno = require('../models/aluno.js')(sequelize, Sequelize);
db.treino = require('../models/treino.js')(sequelize, Sequelize);

db.plano.hasMany(db.aluno, {foreignKey: 'plano_id'});
db.aluno.belongsTo(db.plano, {foreignKey: 'plano_id'});
=======
db.ficha = require('../models/ficha.js')(sequelize, Sequelize);
>>>>>>> 37bc233 (em desenvolvimento...)

module.exports = db;