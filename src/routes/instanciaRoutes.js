const express = require("express");
const router = express.Router();
const {
  criarInstancia,
  listarInstancias,
  buscarInstancia,
  atualizarInstancia,
  excluirInstancia,
} = require("../controllers/instanciaController");

router.post("/", criarInstancia);
router.get("/", listarInstancias);
router.get("/:id", buscarInstancia);
router.put("/:id", atualizarInstancia);
router.delete("/:id", excluirInstancia);

module.exports = router;
