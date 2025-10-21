const Usuario = require('../models/Usuario');

const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipo_usuario } = req.body;
    const novoUsuario = await Usuario.create({ nome, email, senha, tipo_usuario });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
};

module.exports = { criarUsuario, listarUsuarios };
