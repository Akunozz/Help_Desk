const express = require('express');
const router = express.Router();
const {
  criarMovimentacao,
  listarHistorico,
  buscarMovimentacao
} = require('../controllers/historicoController');

router.post('/', criarMovimentacao);
router.get('/', listarHistorico);
router.get('/:id', buscarMovimentacao);

module.exports = router;
