const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const Empresa = require("../models/Empresa");

exports.criar = async (req, res) => {
  try {
    const { nome, email, senha, empresaId } = req.body;

    const empresa = await Empresa.findByPk(empresaId);
    if (!empresa) {
      return res.status(404).json({ erro: "Empresa não encontrada" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      EmpresaId: empresaId
    });

    const usuarioSemSenha = {
  id: usuario.id,
  nome: usuario.nome,
  email: usuario.email,
  role: usuario.role,
  EmpresaId: usuario.EmpresaId
};

res.status(201).json(usuarioSemSenha);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.listar = async (req, res) => {
  const usuarios = await Usuario.findAll({ include: Empresa });
  res.json(usuarios);
};