const Cliente = require("../models/Cliente");

const criar = async (req, res) => {
  try {
    const { nome, cpf_cnpj, telefone, email, endereco, observacoes } = req.body;

    const cliente = await Cliente.create({
      nome,
      cpf_cnpj,
      telefone,
      email,
      endereco,
      observacoes,
      empresa_id: req.user.empresaId
    });

    return res.status(201).json(cliente);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return res.status(500).json({ error: "Erro ao criar cliente" });
  }
};

const listar = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      where: { empresa_id: req.user.empresaId }
    });

    return res.json(clientes);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    return res.status(500).json({ error: "Erro ao listar clientes" });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findOne({
      where: {
        id,
        empresa_id: req.user.empresaId
      }
    });

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.json(cliente);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    return res.status(500).json({ error: "Erro ao buscar cliente" });
  }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findOne({
      where: {
        id,
        empresa_id: req.user.empresaId
      }
    });

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    await cliente.update(req.body);

    return res.json(cliente);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
};

const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findOne({
      where: {
        id,
        empresa_id: req.user.empresaId
      }
    });

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    await cliente.destroy();

    return res.json({ message: "Cliente removido com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    return res.status(500).json({ error: "Erro ao deletar cliente" });
  }
};

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  deletar
};