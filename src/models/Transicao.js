const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Importa os outros models para criar relações
const ProcessoTemplate = require('./ProcessoTemplate');
const Etapa = require('./Etapa');

const Transicao = sequelize.define('Transicao', {
  nome_acao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  etapa_origem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  etapa_destino_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  template_id: {                
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'transicoes',
  timestamps: false
});

Transicao.belongsTo(ProcessoTemplate, { foreignKey: 'template_id' });
Transicao.belongsTo(Etapa, { as: 'etapaOrigem', foreignKey: 'etapa_origem_id' });
Transicao.belongsTo(Etapa, { as: 'etapaDestino', foreignKey: 'etapa_destino_id' });

module.exports = Transicao;
