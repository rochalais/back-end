const express = require('express');
const planosRoutes = require('./routes/planosRoutes');
const db = require('./config/db_sequelize');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* RODAR SOMENTE A PRIMEIRA VEZ PARA CRIAR A TABELA NO BANCO DE DADOS, DEPOIS COMENTAR ESSE BLOCO
db.sequelize.sync({ force: true }).then(() => {
  console.log('{ force: true }');
});
*/

app.use(planosRoutes);

app.get('/', (req, res) => {
  res.send('Página Inicial');
});

app.listen(8081, function () {
  console.log('Servidor no http://localhost:8081');
});
