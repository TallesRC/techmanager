const Usuario = require("../models/Usuario");
const Empresa = require("../models/Empresa");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==========================
// REGISTER
// ==========================
const register = async (req, res) => {
  try {
    const { nome, email, senha, nomeEmpresa } = req.body;

    // validação básica
    if (!nome || !email || !senha || !nomeEmpresa) {
      return res.status(400).json({
        error: "Nome, email, senha e nome da empresa são obrigatórios"
      });
    }

    // verifica se email já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // cria empresa
    const empresa = await Empresa.create({ nome: nomeEmpresa });

    // cria hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // cria usuário vinculado à empresa
    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      empresa_id: empresa.id, // 🔥 vincula usuário à empresa
      role: "admin"
    });

    return res.status(201).json({
      message: "Cadastro realizado com sucesso",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role
      },
      empresa: {
        id: empresa.id,
        nome: empresa.nome
      }
    });
  } catch (error) {
    console.error("Erro no register:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// ==========================
// LOGIN
// ==========================
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // busca usuário pelo email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    // compara senha usando bcrypt
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    // gera token
    const token = jwt.sign(
      {
        id: usuario.id,
        empresaId: usuario.empresa_id,
        role: usuario.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  register,
  login
};