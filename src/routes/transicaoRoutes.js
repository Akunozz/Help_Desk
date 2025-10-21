const express = require('express');
const router = express.Router();
const {
  criarTransicao,
  listarTransicoes,
  buscarTransicao,
  atualizarTransicao,
  excluirTransicao
} = require('../controllers/transicaoController');

router.post('/', criarTransicao);
router.get('/', listarTransicoes);
router.get('/:id', buscarTransicao);
router.put('/:id', atualizarTransicao);
router.delete('/:id', excluirTransicao);

module.exports = router;
