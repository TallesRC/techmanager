const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Empresa = require("./Empresa");

const Usuario = sequelize.define("Usuario", {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  senha: { 
  type: DataTypes.STRING,
  allowNull: false 
},
  role: { type: DataTypes.STRING, defaultValue: "admin" }
}, {
  defaultScope: {
    attributes: { exclude: ["senha"] }
  }

  
});

Empresa.hasMany(Usuario);
Usuario.belongsTo(Empresa);

module.exports = Usuario;