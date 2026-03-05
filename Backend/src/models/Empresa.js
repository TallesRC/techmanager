const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Empresa = sequelize.define("Empresa", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cnpj: DataTypes.STRING,
  plano: DataTypes.STRING,
  ativo: DataTypes.BOOLEAN
}, {
  tableName: "empresas",
  underscored: true,
  timestamps: true
});

module.exports = Empresa;