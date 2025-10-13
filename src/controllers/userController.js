const pool = require("../config/db");
const bcrypt = require("bcrypt");

const saltRounds = 10; // Fator de custo para a criptografia da senha

// @desc    Criar um novo usuário (cliente ou suporte)
// @route   POST /api/users
const createUser = async (req, res) => {
  const { nome, email, senha, tipo_usuario } = req.body;

  if (!nome || !email || !senha || !tipo_usuario) {
    return res
      .status(400)
      .json({
        message:
          "Todos os campos são obrigatórios: nome, email, senha, tipo_usuario.",
      });
  }

  if (tipo_usuario !== "cliente" && tipo_usuario !== "suporte") {
    return res
      .status(400)
      .json({ message: "O tipo_usuario deve ser 'cliente' ou 'suporte'." });
  }

  try {
    // Criptografa a senha antes de salvar no banco
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const sql =
      "INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(sql, [
      nome,
      email,
      senhaHash,
      tipo_usuario,
    ]);

    res.status(201).json({ id: result.insertId, nome, email, tipo_usuario });
  } catch (error) {
    // Verifica se o erro é de e-mail duplicado
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Este e-mail já está cadastrado." });
    }
    res
      .status(500)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
};

// @desc    Listar todos os usuários
// @route   GET /api/users
const getAllUsers = async (req, res) => {
  try {
    // Seleciona todos os campos, exceto a senha
    const [rows] = await pool.query(
      "SELECT id, nome, email, tipo_usuario FROM usuarios"
    );
    res.status(200).json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuários", error: error.message });
  }
};

// @desc    Autenticar um usuário (login)
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ message: "E-mail e senha são obrigatórios." });
  }

  try {
    // Busca o usuário pelo e-mail
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas." }); // Usuário não encontrado
    }

    const user = rows[0];

    // Compara a senha enviada com a senha criptografada no banco
    const match = await bcrypt.compare(senha, user.senha);

    if (match) {
      // Senha correta
      res.status(200).json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
        message: "Login bem-sucedido!",
      });
    } else {
      // Senha incorreta
      res.status(401).json({ message: "Credenciais inválidas." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
};
