const Instancia = require('../models/ProcessoInstancia');

const criarInstancia = async (req, res) => {
  try {
    const { titulo, template_id, etapa_atual_id, solicitante_id, responsavel_id, data_conclusao, status } = req.body;
    const nova = await Instancia.create({ titulo, template_id, etapa_atual_id, solicitante_id, responsavel_id, data_conclusao, status });
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar instância', detalhes: error.message });
  }
};

const listarInstancias = async (req, res) => {
  try {
    const lista = await Instancia.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar instâncias' });
  }
};

const buscarInstancia = async (req, res) => {
  try {
    const instancia = await Instancia.findByPk(req.params.id);
    if (!instancia) return res.status(404).json({ erro: 'Instância não encontrada' });
    res.json(instancia);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar instância' });
  }
};

const atualizarInstancia = async (req, res) => {
  try {
    const { titulo, template_id, etapa_atual_id, solicitante_id, responsavel_id, data_conclusao, status } = req.body;
    const instancia = await Instancia.findByPk(req.params.id);
    if (!instancia) return res.status(404).json({ erro: 'Instância não encontrada' });

    await instancia.update({ titulo, template_id, etapa_atual_id, solicitante_id, responsavel_id, data_conclusao, status });
    res.json(instancia);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar instância' });
  }
};

const excluirInstancia = async (req, res) => {
  try {
    const instancia = await Instancia.findByPk(req.params.id);
    if (!instancia) return res.status(404).json({ erro: 'Instância não encontrada' });

    await instancia.destroy();
    res.json({ mensagem: 'Instância excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir instância' });
  }
};

module.exports = {
  criarInstancia,
  listarInstancias,
  buscarInstancia,
  atualizarInstancia,
  excluirInstancia
};
