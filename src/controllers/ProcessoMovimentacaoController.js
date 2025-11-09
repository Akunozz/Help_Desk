const Instancia = require('../models/ProcessoInstancia');
const Etapa = require('../models/Etapa');
const Transicao = require('../models/Transicao');
const Usuario = require('../models/Usuario');
const Historico = require('../models/ProcessoHistorico');

const movimentarEtapa = async (req, res) => {
  try {
    const { processo_id, etapa_destino_id, usuario_responsavel_id, observacao } = req.body;

    // 1. Carrega a instância
    const instancia = await Instancia.findByPk(processo_id);
    if (!instancia) return res.status(404).json({ erro: 'Instância não encontrada' });
    if (instancia.status !== 'em_andamento') {
      return res.status(400).json({ erro: 'Instância não está em andamento' });
    }

    // 2. Verifica se o usuário existe
    const usuario = await Usuario.findByPk(usuario_responsavel_id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário responsável não encontrado' });

    // 3. Verifica se o usuário pode movimentar
    const isAdmin = usuario.tipo_usuario === 'administrador';
    const isResponsavel = instancia.responsavel_id === usuario.id;

    if (!isAdmin && !isResponsavel) {
      return res.status(403).json({ erro: 'Usuário não tem permissão para movimentar esta instância' });
    }

    // 4. Verifica se a etapa destino é diferente da atual
    if (instancia.etapa_atual_id === etapa_destino_id) {
      return res.status(400).json({ erro: 'A etapa destino é igual à etapa atual' });
    }

    // 5. Se usuário for comum, verifica se existe transição válida
    if (!isAdmin) {
      const transicao = await Transicao.findOne({
        where: {
          etapa_origem_id: instancia.etapa_atual_id,
          etapa_destino_id,
          template_id: instancia.template_id
        }
      });
      if (!transicao) {
        return res.status(403).json({ erro: 'Movimentação não permitida para usuários comuns' });
      }
    }

    // 6. Atualiza a instância
    const etapaDestino = await Etapa.findByPk(etapa_destino_id);
    if (!etapaDestino) return res.status(404).json({ erro: 'Etapa destino não encontrada' });

    const atualizacoes = {
      etapa_atual_id: etapa_destino_id
    };

    if (etapaDestino.etapa_final) {
      atualizacoes.status = 'concluido';
      atualizacoes.data_conclusao = new Date();
    }

    await instancia.update(atualizacoes);

    // 7. Registra no histórico
    await Historico.create({
      processo_id,
      etapa_origem_id: instancia.etapa_atual_id,
      etapa_destino_id,
      usuario_responsavel_id,
      observacao
    });

    res.json({ mensagem: 'Movimentação realizada com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao movimentar etapa', detalhes: error.message });
  }
};

module.exports = {
  movimentarEtapa
};
