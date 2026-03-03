const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Empresa = sequelize.define("Empresa", {
  nome: { type: DataTypes.STRING, allowNull: false },
  cnpj: DataTypes.STRING,
  plano: { type: DataTypes.STRING, defaultValue: "basic" },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = Empresa;