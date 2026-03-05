const Empresa = require("../models/Empresa");

exports.criar = async (req, res) => {
  try {
    const empresa = await Empresa.create(req.body);
    res.status(201).json(empresa);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.listar = async (req, res) => {
  const empresas = await Empresa.findAll();
  res.json(empresas);
};