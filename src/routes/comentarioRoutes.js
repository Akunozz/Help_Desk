const express = require('express');
const router = express.Router();
const {
  criarComentario,
  listarComentarios,
  buscarComentario,
  excluirComentario
} = require('../controllers/comentarioController');

router.post('/', criarComentario);
router.get('/', listarComentarios);
router.get('/:id', buscarComentario);
router.delete('/:id', excluirComentario);

module.exports = router;
