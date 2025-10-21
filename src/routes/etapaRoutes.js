const express = require('express');
const router = express.Router();
const {
  criarEtapa,
  listarEtapas,
  buscarEtapa,
  atualizarEtapa,
  excluirEtapa
} = require('../controllers/etapaController');

router.post('/', criarEtapa);
router.get('/', listarEtapas);
router.get('/:id', buscarEtapa);
router.put('/:id', atualizarEtapa);
router.delete('/:id', excluirEtapa);

module.exports = router;
