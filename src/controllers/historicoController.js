const Historico = require('../models/ProcessoHistorico');

const criarMovimentacao = async (req, res) => {
  try {
    const { processo_id, etapa_origem_id, etapa_destino_id, usuario_responsavel_id, observacao } = req.body;
    const nova = await Historico.create({ processo_id, etapa_origem_id, etapa_destino_id, usuario_responsavel_id, observacao });
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao registrar movimentação', detalhes: error.message });
  }
};

const listarHistorico = async (req, res) => {
  try {
    const lista = await Historico.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar histórico' });
  }
};

const buscarMovimentacao = async (req, res) => {
  try {
    const movimentacao = await Historico.findByPk(req.params.id);
    if (!movimentacao) return res.status(404).json({ erro: 'Movimentação não encontrada' });
    res.json(movimentacao);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar movimentação' });
  }
};

module.exports = {
  criarMovimentacao,
  listarHistorico,
  buscarMovimentacao
};
