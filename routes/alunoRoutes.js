const express = require('express');
const controller = require('../controllers/alunoController');

const router = express.Router();

router.get('/alunos/cadastro', controller.exibirCadastro);
router.get('/alunos/deletar', controller.exibirDeletar);
router.get('/alunos/atualizar', controller.exibirAtualizar);
router.get('/alunos', controller.listar);
router.post('/alunos', controller.cadastrar);
router.get('/alunos/:id', controller.buscarPorId);
router.put('/alunos/:id', controller.atualizar);
router.delete('/alunos/:id', controller.deletar);

module.exports = router;