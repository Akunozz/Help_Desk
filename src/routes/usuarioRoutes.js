const express = require('express');
const router = express.Router();
const {
  criarUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  excluirUsuario,
  loginUsuario
} = require('../controllers/usuarioController');

// Criar novo usuário
router.post('/', criarUsuario);

// Listar todos os usuários
router.get('/', listarUsuarios);

// Buscar usuário por ID
router.get('/:id', buscarUsuario);

// Atualizar usuário por ID
router.put('/:id', atualizarUsuario);

// Excluir usuário por ID
router.delete('/:id', excluirUsuario);

// Login do usuário
router.post('/login', loginUsuario);

module.exports = router;
