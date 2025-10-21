const Etapa = require('../models/Etapa');

const criarEtapa = async (req, res) => {
  try {
    const { nome, descricao, template_id } = req.body;
    const nova = await Etapa.create({ nome, descricao, template_id });
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar etapa', detalhes: error.message });
  }
};

const listarEtapas = async (req, res) => {
  try {
    const etapas = await Etapa.findAll();
    res.json(etapas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar etapas' });
  }
};

const buscarEtapa = async (req, res) => {
  try {
    const etapa = await Etapa.findByPk(req.params.id);
    if (!etapa) return res.status(404).json({ erro: 'Etapa não encontrada' });
    res.json(etapa);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar etapa' });
  }
};

const atualizarEtapa = async (req, res) => {
  try {
    const { nome, descricao, template_id } = req.body;
    const etapa = await Etapa.findByPk(req.params.id);
    if (!etapa) return res.status(404).json({ erro: 'Etapa não encontrada' });

    await etapa.update({ nome, descricao, template_id });
    res.json(etapa);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar etapa' });
  }
};

const excluirEtapa = async (req, res) => {
  try {
    const etapa = await Etapa.findByPk(req.params.id);
    if (!etapa) return res.status(404).json({ erro: 'Etapa não encontrada' });

    await etapa.destroy();
    res.json({ mensagem: 'Etapa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir etapa' });
  }
};

module.exports = {
  criarEtapa,
  listarEtapas,
  buscarEtapa,
  atualizarEtapa,
  excluirEtapa
};
