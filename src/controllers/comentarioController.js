const Comentario = require('../models/ProcessoComentario');

const criarComentario = async (req, res) => {
  try {
    const { texto, processo_id, usuario_id } = req.body;
    const novo = await Comentario.create({ texto, processo_id, usuario_id });
    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar comentário', detalhes: error.message });
  }
};

const listarComentarios = async (req, res) => {
  try {
    const lista = await Comentario.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar comentários' });
  }
};

const buscarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByPk(req.params.id);
    if (!comentario) return res.status(404).json({ erro: 'Comentário não encontrado' });
    res.json(comentario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar comentário' });
  }
};

const excluirComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByPk(req.params.id);
    if (!comentario) return res.status(404).json({ erro: 'Comentário não encontrado' });

    await comentario.destroy();
    res.json({ mensagem: 'Comentário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir comentário' });
  }
};

module.exports = {
  criarComentario,
  listarComentarios,
  buscarComentario,
  excluirComentario
};
