const express = require('express');
const app = express();
const sequelize = require('./src/config/sequelize');

const usuarioRoutes = require('./src/routes/usuarioRoutes');

app.use(express.json());
app.use('/usuarios', usuarioRoutes);

sequelize.sync().then(() => {
  console.log('Banco sincronizado');
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
