const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

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

module.exports = Etapa;
