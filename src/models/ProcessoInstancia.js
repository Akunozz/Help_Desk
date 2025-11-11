const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ProcessoInstancia = sequelize.define(
  "ProcessoInstancia",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    etapa_atual_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    solicitante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    responsavel_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,   // usado no front
    },
    data_conclusao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("em_andamento", "concluido", "cancelado"),
      defaultValue: "em_andamento",
      allowNull: false,
    },
  },
  {
    tableName: "processo_instancias",
    timestamps: false,
  }
);

module.exports = ProcessoInstancia;
