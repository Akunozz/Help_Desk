const Transicao = require('../models/Transicao');

const criarTransicao = async (req, res) => {
  try {
    const { nome_acao, etapa_origem_id, etapa_destino_id } = req.body;
    const nova = await Transicao.create({ nome_acao, etapa_origem_id, etapa_destino_id });
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar transição', detalhes: error.message });
  }
};

const listarTransicoes = async (req, res) => {
  try {
    const lista = await Transicao.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar transições' });
  }
};

const buscarTransicao = async (req, res) => {
  try {
    const transicao = await Transicao.findByPk(req.params.id);
    if (!transicao) return res.status(404).json({ erro: 'Transição não encontrada' });
    res.json(transicao);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar transição' });
  }
};

const atualizarTransicao = async (req, res) => {
  try {
    const { nome_acao, etapa_origem_id, etapa_destino_id } = req.body;
    const transicao = await Transicao.findByPk(req.params.id);
    if (!transicao) return res.status(404).json({ erro: 'Transição não encontrada' });

    await transicao.update({ nome_acao, etapa_origem_id, etapa_destino_id });
    res.json(transicao);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar transição' });
  }
};

const excluirTransicao = async (req, res) => {
  try {
    const transicao = await Transicao.findByPk(req.params.id);
    if (!transicao) return res.status(404).json({ erro: 'Transição não encontrada' });

    await transicao.destroy();
    res.json({ mensagem: 'Transição excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir transição' });
  }
};

module.exports = {
  criarTransicao,
  listarTransicoes,
  buscarTransicao,
  atualizarTransicao,
  excluirTransicao
};
