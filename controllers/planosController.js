const db = require('../config/db_sequelize');
const path = require('path');

exports.listar = async (req, res) => {
  const planos = await db.plano.findAll();
  res.json(planos);
};

exports.buscarPorId = async (req, res) => {
  const plano = await db.plano.findByPk(req.params.id);
  res.json(plano);
};

exports.exibirCadastro = (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/cadastroPlano.html'));
};

exports.exibirDeletar = (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/deletarPlano.html'));
};

exports.exibirAtualizar = (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/atualizarPlano.html'));
};

exports.cadastrar = async (req, res) => {
  await db.plano.create({
    nome: req.body.nome,
    valor: req.body.valor,
    duracaoMeses: req.body.duracaoMeses
  });

  res.send('Plano cadastrado');
};

exports.deletar = async (req, res) => {
  const plano = await db.plano.findByPk(req.params.id);
  if (plano) {
    await plano.destroy();
    res.send('Plano deletado');
  } else {
    res.send('Plano não encontrado');
  }
};

exports.atualizar = async (req, res) => {
  const plano = await db.plano.findByPk(req.params.id);

  if (!plano) {
    return res.status(404).send('Plano não encontrado');
  }

  await plano.update({
    nome: req.body.nome,
    valor: req.body.valor,
    duracaoMeses: req.body.duracaoMeses
  });

  res.send('Plano atualizado');
};