const express = require("express");
const router = express.Router();
const {
  getAllTickets,
  createTicket,
} = require("../controllers/ticketController");

// Rota para listar todos os tickets
router.get("/tickets", getAllTickets);

// Rota para criar um novo ticket
router.post("/tickets", createTicket);

module.exports = router;
