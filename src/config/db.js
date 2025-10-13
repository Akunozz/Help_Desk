const mysql = require("mysql2");

// Criar um pool de conexões para melhor gerenciamento
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "helpdesk",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise(); // Usar promises para async/await

// Testar a conexão
pool.query("SELECT 1 + 1 AS solution")
  .then(([rows]) => {
    console.log("Conexão com banco de dados estabelecida. Solução:", rows[0].solution);
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco de dados:", err.message);
  });

module.exports = pool;
