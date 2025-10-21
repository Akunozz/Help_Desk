const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProcessoHistorico = sequelize.define('ProcessoHistorico', {
  processo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  etapa_origem_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  etapa_destino_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuario_responsavel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'processo_historico',
  timestamps: false
});

module.exports = ProcessoHistorico;
