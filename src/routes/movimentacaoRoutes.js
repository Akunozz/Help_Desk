const express = require('express');
const router = express.Router();
const { movimentarEtapa } = require('../controllers/ProcessoMovimentacaoController');

router.post('/movimentar', movimentarEtapa);

module.exports = router;
