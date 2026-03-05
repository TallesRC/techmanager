const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrdemServico = sequelize.define("OrdemServico", {
  descricao: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    defaultValue: "aberta"
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "ordens_servico",
  underscored: true,
  timestamps: true
});

module.exports = OrdemServico;