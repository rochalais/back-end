const express = require('express');
const planosRoutes = require('./routes/planosRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const db = require('./config/db_sequelize');
const db_mongoose = require('./config/db_mongoose');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'pages')));

db.sequelize.sync({ alter: true }).then(() => { //Com alter: true pode rodar mais de uma vez sem problema
  console.log('{ alter: true }');
});

mongoose.connect(
  db_mongoose.connection,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((e) => {
  console.log('Erro ', e);
});

app.use(planosRoutes);
app.use(alunoRoutes);
app.use(fichaRoutes);

app.get('/', (req, res) => {
  res.send('Página Inicial');
});

app.listen(8081, function () {
  console.log('Servidor no http://localhost:8081');
});
