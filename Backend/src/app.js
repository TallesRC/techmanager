const express = require("express");
const cors = require("cors");

const empresaRoutes = require("./routes/empresaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");
const clienteRoutes = require("./routes/clienteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API TechManager funcionando 🚀");
});

app.use("/empresas", empresaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/auth", authRoutes);
app.use("/clientes", clienteRoutes);

app.get("/teste", (req, res) => {
  res.json({ funcionando: true });
});

module.exports = app;