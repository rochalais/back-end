const express = require('express');
const controller = require('../controllers/planosController');

const router = express.Router();

router.get('/planos/cadastro', controller.exibirCadastro);
router.get('/planos/deletar', controller.exibirDeletar);
router.get('/planos/atualizar', controller.exibirAtualizar);
router.get('/planos', controller.listar);
router.post('/planos', controller.cadastrar);
router.get('/planos/:id', controller.buscarPorId);
router.put('/planos/:id', controller.atualizar);
router.delete('/planos/:id', controller.deletar);

module.exports = router;
