const Template = require('../models/ProcessoTemplate');

const criarTemplate = async (req, res) => {
  try {
    const { nome, descricao, etapa_inicial_id } = req.body;
    const novo = await Template.create({ nome, descricao, etapa_inicial_id });
    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar template', detalhes: error.message });
  }
};

const listarTemplates = async (req, res) => {
  try {
    const lista = await Template.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar templates' });
  }
};

const buscarTemplate = async (req, res) => {
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) return res.status(404).json({ erro: 'Template não encontrado' });
    res.json(template);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar template' });
  }
};

const atualizarTemplate = async (req, res) => {
  try {
    const { nome, descricao, etapa_inicial_id } = req.body;
    const template = await Template.findByPk(req.params.id);
    if (!template) return res.status(404).json({ erro: 'Template não encontrado' });

    await template.update({ nome, descricao, etapa_inicial_id });
    res.json(template);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar template' });
  }
};

const excluirTemplate = async (req, res) => {
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) return res.status(404).json({ erro: 'Template não encontrado' });

    await template.destroy();
    res.json({ mensagem: 'Template excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir template' });
  }
};

module.exports = {
  criarTemplate,
  listarTemplates,
  buscarTemplate,
  atualizarTemplate,
  excluirTemplate
};
