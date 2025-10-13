const express = require("express");
const cors = require("cors");
const ticketRoutes = require("./src/routes/ticketRoutes");
const userRoutes = require("./src/routes/userRoutes");
const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do Sistema de Help Desk está no ar!");
});

app.use("/api", ticketRoutes);

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
