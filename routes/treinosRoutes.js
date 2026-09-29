const express = require('express');
const controlador = require('../controllers/treinosController');

const router = express.Router();

router.get('/treinos/cadastro', controlador.cadastrar);
router.get('/treinos/:id', controlador.consultarPk);
router.put('/treinos/:id', controlador.atualizar);
router.delete('/treinos/:id', controlador.deletar);
router.get('/treinos/consultaGeral', controlador.listarTodos);

module.exports = router;