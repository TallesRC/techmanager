const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cliente = sequelize.define("Cliente", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf_cnpj: DataTypes.STRING,
  telefone: DataTypes.STRING,
  email: DataTypes.STRING,
  endereco: DataTypes.TEXT,
  observacoes: DataTypes.TEXT,
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "clientes",
  underscored: true,
  timestamps: true
});

module.exports = Cliente;