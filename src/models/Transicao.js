const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

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
  }
}, {
  tableName: 'transicoes',
  timestamps: false
});

module.exports = Transicao;
