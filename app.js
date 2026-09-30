const express = require('express');
const planosRoutes = require('./routes/planosRoutes');
const db = require('./config/db_sequelize');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



db.sequelize.sync({ alter: true }).then(() => {
  console.log('{ alter: true }');
});

app.use(planosRoutes);
app.use(treinosRoutes);

app.get('/', (req, res) => {
  res.send('Página Inicial');
});

app.listen(8081, function () {
  console.log('Servidor no http://localhost:8081');
});
