const express = require("express");
const router = express.Router();

const ClienteController = require("../controllers/ClienteController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", ClienteController.criar);
router.get("/", ClienteController.listar);
router.get("/:id", ClienteController.buscarPorId);
router.put("/:id", ClienteController.atualizar);
router.delete("/:id", ClienteController.deletar);

module.exports = router;