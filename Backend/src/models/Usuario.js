const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Empresa = require("./Empresa");

const Usuario = sequelize.define("Usuario", {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING,
  role: DataTypes.STRING,
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "usuarios",
  underscored: true,
  timestamps: true
});

module.exports = Usuario;