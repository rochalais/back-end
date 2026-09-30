const express = require('express');
const planosRoutes = require('./routes/planosRoutes');
const treinosRoutes = require('./routes/treinosRoutes');
const db = require('./config/db_sequelize');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'pages')));


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
