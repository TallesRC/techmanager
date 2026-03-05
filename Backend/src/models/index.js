const Empresa = require("./Empresa");
const Usuario = require("./Usuario");
const Cliente = require("./Cliente");
const Equipamento = require("./Equipamento");
const OrdemServico = require("./OrdemServico");
const ItemOrdemServico = require("./ItemOrdemServico");

// Empresa
Empresa.hasMany(Usuario, { foreignKey: "empresa_id" });
Usuario.belongsTo(Empresa, { foreignKey: "empresa_id" });

Empresa.hasMany(Cliente, { foreignKey: "empresa_id" });
Cliente.belongsTo(Empresa, { foreignKey: "empresa_id" });

Empresa.hasMany(Equipamento, { foreignKey: "empresa_id" });
Equipamento.belongsTo(Empresa, { foreignKey: "empresa_id" });

Empresa.hasMany(OrdemServico, { foreignKey: "empresa_id" });
OrdemServico.belongsTo(Empresa, { foreignKey: "empresa_id" });

// Cliente
Cliente.hasMany(Equipamento, { foreignKey: "cliente_id" });
Equipamento.belongsTo(Cliente, { foreignKey: "cliente_id" });

Cliente.hasMany(OrdemServico, { foreignKey: "cliente_id" });
OrdemServico.belongsTo(Cliente, { foreignKey: "cliente_id" });

// Ordem Serviço
OrdemServico.hasMany(ItemOrdemServico, { foreignKey: "ordem_servico_id" });
ItemOrdemServico.belongsTo(OrdemServico, { foreignKey: "ordem_servico_id" });

module.exports = {
  Empresa,
  Usuario,
  Cliente,
  Equipamento,
  OrdemServico,
  ItemOrdemServico
};