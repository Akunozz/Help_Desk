const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Importa o model de Template
const ProcessoTemplate = require('./ProcessoTemplate');

const Etapa = sequelize.define('Etapa', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  template_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'etapas',
  timestamps: false
});

Etapa.belongsTo(ProcessoTemplate, { foreignKey: 'template_id' });

module.exports = Etapa;
