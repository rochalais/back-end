const express = require('express');
const controlador = require('../controllers/treinosController');

const router = express.Router();

router.get('/treinos/cadastro', controlador.cadastrar);
router.get('treinos/:id', controlador.consultarPk)
module.exports = router;