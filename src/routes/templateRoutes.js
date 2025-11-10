const express = require('express');
const router = express.Router();
const {
  criarTemplate,
  listarTemplates,
  buscarTemplate,
  atualizarTemplate,
  excluirTemplate,
  atualizarEtapaInicial
} = require('../controllers/templateController');

router.post('/', criarTemplate);
router.get('/', listarTemplates);
router.get('/:id', buscarTemplate);
router.put('/:id', atualizarTemplate);
router.patch('/:id/etapa-inicial', atualizarEtapaInicial);
router.delete('/:id', excluirTemplate);

module.exports = router;
