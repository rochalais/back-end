const express = require('express');

const controller = require('../controllers/treinoController');

const router = express.Router();

// Rotas das páginas de Treino
router.get('/treinos/cadastro', controller.exibirCadastro);
router.get('/treinos/atualizar', controller.exibirAtualizar);
router.get('/treinos/deletar', controller.exibirDeletar);

// Rotas do CRUD
router.get('/treinos', controller.listar);
router.post('/treinos', controller.cadastrar);
router.get('/treinos/:id', controller.buscarPorId);
router.put('/treinos/:id', controller.atualizar);
router.delete('/treinos/:id', controller.deletar);

module.exports = router;