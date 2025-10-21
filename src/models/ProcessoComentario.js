const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProcessoComentario = sequelize.define('ProcessoComentario', {
  texto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  processo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'processo_comentarios',
  timestamps: false
});

module.exports = ProcessoComentario;
