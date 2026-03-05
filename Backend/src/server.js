console.log("SERVER CERTO INICIADO");

require("dotenv").config();
require("./models");

const sequelize = require("./config/database");
const app = require("./app");

sequelize.sync({ alter: true }) // 👈 MUDE AQUI PARA ATUALIZAR E GERAR O BANCO 
  .then(() => {
    console.log("Banco sincronizado 🚀");

    app.listen(process.env.PORT || 3001, () => {
      console.log("Servidor rodando na porta 3001 🔥");
    });
  })
  .catch((err) => {
    console.error("Erro ao iniciar:", err);
  });