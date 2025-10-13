const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  loginUser,
} = require("../controllers/userController");

// Rota para listar todos os usuários
router.get("/users", getAllUsers);

// Rota para criar um novo usuário
router.post("/users", createUser);

// Rota para login de usuário
router.post("/users/login", loginUser);

module.exports = router;
