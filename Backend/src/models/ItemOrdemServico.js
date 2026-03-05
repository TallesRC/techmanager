const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ItemOrdemServico = sequelize.define("ItemOrdemServico", {
  descricao: DataTypes.STRING,
  valor: DataTypes.DECIMAL(10,2),
  quantidade: DataTypes.INTEGER,
  ordem_servico_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "itens_ordem_servico",
  underscored: true,
  timestamps: true
});

module.exports = ItemOrdemServico;