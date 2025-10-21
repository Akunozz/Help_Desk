const express = require('express');
const router = express.Router();
const {
  criarTemplate,
  listarTemplates,
  buscarTemplate,
  atualizarTemplate,
  excluirTemplate
} = require('../controllers/templateController');

router.post('/', criarTemplate);
router.get('/', listarTemplates);
router.get('/:id', buscarTemplate);
router.put('/:id', atualizarTemplate);
router.delete('/:id', excluirTemplate);

module.exports = router;
