const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const Empresa = require("../models/Empresa");

module.exports = {

  async register(req, res) {
    const { empresaNome, nome, email, senha } = req.body;

    const empresa = await Empresa.create({ nome: empresaNome });

    const hash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: hash,
      EmpresaId: empresa.id
    });

    return res.json({ message: "Empresa criada com sucesso!" });
  },

  async login(req, res) {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    const match = await bcrypt.compare(senha, usuario.senha);
    if (!match) return res.status(401).json({ error: "Senha inválida" });

    const token = jwt.sign(
      {
        id: usuario.id,
        empresaId: usuario.EmpresaId
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  }
};