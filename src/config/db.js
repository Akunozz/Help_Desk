const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "helpdesk",
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) throw err;

  console.log("The solution is: ", rows[0].solution);
});

connection.end();
