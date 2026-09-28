module.exports = (sequelize, Sequelize) => {
  const Plano = sequelize.define('plano', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    valor: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    duracaoMeses: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'duracao_meses'
    }
  }, {
    tableName: 'plano',
    timestamps: false
  });

  return Plano;
}
