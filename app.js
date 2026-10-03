const express = require('express');
const planosRoutes = require('./routes/planosRoutes');
<<<<<<< HEAD
const alunoRoutes = require('./routes/alunoRoutes');
=======
const treinosRoutes = require('./routes/treinosRoutes');
>>>>>>> 9ca193d (rota no app.js)
const db = require('./config/db_sequelize');
<<<<<<< HEAD
const db_mongoose = require('./config/db_mongoose');
const mongoose = require('mongoose');
=======
const path = require('path');
>>>>>>> c761741 (bug fixes)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'pages')));

<<<<<<< HEAD
db.sequelize.sync({ alter: true }).then(() => { //Com alter: true pode rodar mais de uma vez sem problema
=======

db.sequelize.sync({ alter: true }).then(() => {
>>>>>>> c761741 (bug fixes)
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
app.use(treinosRoutes);

app.get('/', (req, res) => {
  res.send('Página Inicial');
});

app.listen(8081, function () {
  console.log('Servidor no http://localhost:8081');
});
