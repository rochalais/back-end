const express = require('express');
const planosRoutes = require('./routes/planosRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(planosRoutes);

app.get('/', (req, res) => {
  res.send('Página Inicial');
});

app.listen(8081, function () {
  console.log('Servidor no http://localhost:8081');
});
