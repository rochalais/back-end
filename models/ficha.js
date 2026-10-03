const mongoose = require('mongoose');

const ficha = mongoose.Schema({
    treinoId: {type: Number, required: true, index: true},
    exercicios: [{
        nome: {type: String, required: true},
        series: {type: Number, required: true},
        repeticoes: {type: Number, required: false}
    }],
    dia: {type: Number, required: false}
});

module.exports = mongoose.model('Ficha', ficha);
