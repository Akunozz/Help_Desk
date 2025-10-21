const Usuario = require('../models/Usuario');

// Criar novo usuário
const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipo_usuario } = req.body;
    const novoUsuario = await Usuario.create({ nome, email, senha, tipo_usuario });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
  }
};

// Listar todos os usuários
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
};

// Buscar usuário por ID
const buscarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
};

// Atualizar usuário por ID
const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipo_usuario } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    await usuario.update({ nome, email, senha, tipo_usuario });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: error.message });
  }
};

// Excluir usuário por ID
const excluirUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    await usuario.destroy();
    res.json({ mensagem: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir usuário' });
  }
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  excluirUsuario
};
