const { Op } = require("sequelize");
const Instancia = require("../models/ProcessoInstancia");

const criarInstancia = async (req, res) => {
  try {
    const nova = await Instancia.create(req.body);
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar instância", detalhes: error.message });
  }
};

const listarInstancias = async (req, res) => {
  try {
    const {
      status,
      titulo,
      template_id,
      solicitante_id,
      responsavel_id,
      etapa_atual_id,
    } = req.query;

    const where = {};

    if (status && status !== "all") where.status = status;
    if (titulo) where.titulo = { [Op.like]: `%${titulo}%` };
    if (template_id) where.template_id = Number(template_id);
    if (solicitante_id) where.solicitante_id = Number(solicitante_id);
    if (responsavel_id) where.responsavel_id = Number(responsavel_id);
    if (etapa_atual_id) where.etapa_atual_id = Number(etapa_atual_id);

    const lista = await Instancia.findAll({
      where,
      order: [["id", "DESC"]],
    });

    res.json(lista);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao listar instâncias", detalhes: error.message });
  }
};

const buscarInstancia = async (req, res) => {
  try {
    const instancia = await Instancia.findByPk(req.params.id);
    if (!instancia) return res.status(404).json({ erro: "Instância não encontrada" });
    res.json(instancia);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar instância" });
  }
};

const atualizarInstancia = async (req, res) => {
  try {
    const instancia = await Instancia.findByPk(req.params.id);
    if (!instancia) return res.status(404).json({ erro: "Instância não encontrada" });

    await instancia.update(req.body);
    res.json(instancia);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar instância" });
  }
};

const excluirInstancia = async (req, res) => {
  try {
    const instancia = await Instancia.findByPk(req.params.id);
    if (!instancia) return res.status(404).json({ erro: "Instância não encontrada" });

    await instancia.destroy();
    res.json({ mensagem: "Instância excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao excluir instância" });
  }
};

module.exports = {
  criarInstancia,
  listarInstancias,
  buscarInstancia,
  atualizarInstancia,
  excluirInstancia,
};
