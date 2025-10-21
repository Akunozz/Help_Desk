const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProcessoTemplate = sequelize.define('ProcessoTemplate', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  etapa_inicial_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'processo_templates',
  timestamps: false
});

module.exports = ProcessoTemplate;
