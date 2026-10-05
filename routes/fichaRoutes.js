const express = require('express');
const controller = require('../controllers/fichaController');

const router = express.Router();

router.get('/fichas/indexFichas', controller.exibirIndex);
router.post('/fichas/cadastro', controller.cadastrarFicha);
router.get('/fichas/consulta', controller.consultarPorTreinoId);
router.put('/fichas/:id', controller.atualizarPorId);
router.delete('/fichas/:id', controller.deletarPorId);
router.get('/fichas/treino/:treinoId', controller.consultarPorTreinoId);

module.exports = router;