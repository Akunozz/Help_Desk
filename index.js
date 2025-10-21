const express = require('express');
const app = express();
const sequelize = require('./src/config/sequelize');

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const templateRoutes = require('./src/routes/templateRoutes');
const etapaRoutes = require('./src/routes/etapaRoutes');
const transicaoRoutes = require('./src/routes/transicaoRoutes');
const instanciaRoutes = require('./src/routes/instanciaRoutes');
const comentarioRoutes = require('./src/routes/comentarioRoutes');
const historicoRoutes = require('./src/routes/historicoRoutes');

app.use(express.json());
app.use('/usuarios', usuarioRoutes);
app.use('/templates', templateRoutes);
app.use('/etapas', etapaRoutes);
app.use('/transicoes', transicaoRoutes);
app.use('/instancias', instanciaRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/historico', historicoRoutes);

sequelize.sync().then(() => {
  console.log('Banco sincronizado');
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
