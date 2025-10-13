const pool = require("../config/db");

// @desc    Listar todos os tickets
// @route   GET /api/tickets
const getAllTickets = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tickets ORDER BY data_abertura DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar tickets", error: error.message });
  }
};

// @desc    Criar um novo ticket
// @route   POST /api/tickets
const createTicket = async (req, res) => {
  const { titulo, descricao, cliente_id } = req.body;

  if (!titulo || !descricao || !cliente_id) {
    return res
      .status(400)
      .json({ message: "Título, descrição e ID do cliente são obrigatórios." });
  }

  try {
    const sql =
      "INSERT INTO tickets (titulo, descricao, cliente_id) VALUES (?, ?, ?)";
    const [result] = await pool.query(sql, [titulo, descricao, cliente_id]);

    res
      .status(201)
      .json({ id: result.insertId, titulo, descricao, cliente_id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar ticket", error: error.message });
  }
};

module.exports = {
  getAllTickets,
  createTicket,
};
