const express = require("express");
require("dotenv").config();

const sequelize = require("./src/config/database");

const empresaRoutes = require("./src/routes/empresaRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes");

// 1️⃣ CRIA O APP PRIMEIRO
const app = express();

// 2️⃣ MIDDLEWARES
app.use(express.json());

// 3️⃣ ROTAS
app.get("/", (req, res) => {
  res.send("API TechManager funcionando 🚀");
});

app.use("/empresas", empresaRoutes);
app.use("/usuarios", usuarioRoutes);

// 4️⃣ BANCO + SERVIDOR
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Banco sincronizado 🚀");

    app.listen(process.env.PORT || 3001, () => {
      console.log("Servidor rodando na porta 3001 🔥");
    });
  })
  .catch((err) => {
    console.error("Erro ao iniciar:", err);
  });