const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Equipamento = sequelize.define("Equipamento", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marca: DataTypes.STRING,
  modelo: DataTypes.STRING,
  numero_serie: DataTypes.STRING,
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "equipamentos",
  underscored: true,
  timestamps: true
});

module.exports = Equipamento;