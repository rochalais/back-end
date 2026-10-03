<<<<<<< HEAD
<<<<<<< HEAD
module.exports = (sequelize, Sequelize) => {

    const Treino = sequelize.define('treino', {
        treinoId: {
            type: Sequelize.INTEGER,
=======
<<<<<<<< HEAD:models/ficha.js
<<<<<<< HEAD
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
>>>>>>> e912fb5 (consulta)
=======
const { Sequelize, DataTypes } = require("../config/db_sequelize");

module.exports = (sequelize, Sequelize)=>{
<<<<<<< HEAD
    const Ficha = sequelize.define('treino', {
        treinoId:{
            type: DataTypes.INTEGER,
>>>>>>> 68a535c (modelo)
=======
    const Ficha = sequelize.define('ficha', {
========
module.exports = (sequelize, Sequelize, DataTypes)=>{
    const Treino = sequelize.define('ficha', {
>>>>>>>> e912fb5 (consulta):models/treino.js
        treinoId:{
            type: DataTypes.INTEGER,
>>>>>>> e912fb5 (consulta)
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
<<<<<<< HEAD
<<<<<<< HEAD

        treinoNome: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        treinoObjetivo: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        alunoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'aluno_id'
        },

        treinoDataIn: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },

        treinoDataFim: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                validarData(value) {
                    if (
                        this.treinoDataIn &&
                        new Date(value) <= new Date(this.treinoDataIn)
                    ) {
                        throw new Error(
                            'Data de fim deve ser posterior à data de início'
                        );
=======
=======
>>>>>>> e912fb5 (consulta)
        treinoNome:{
            type: DataTypes.TEXT,
            allowNull: true,
            unique: true
        },
        treinoObjetivo:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        treinoDataIn:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        treinoDataFim:{
            type: DataTypes.DATE,
            allowNull: false,
            validate: { validarData(value){
                    if(this.treinoDataIn && this.treinoDataFim <= this.treinoDataIn){
<<<<<<< HEAD
                        throw new Error('Data de fim deve ser posterior à data de início');
>>>>>>> 68a535c (modelo)
=======
                        throw new Error('Data de fim deve ser posterior à data de início', {statusCode: 500});
>>>>>>> e912fb5 (consulta)
                    }
                }
            }
        }
<<<<<<< HEAD
<<<<<<< HEAD

    }, {
        tableName: 'treino',
        timestamps: false,

        hooks: {
            beforeValidate: (treino) => {

                if (!treino.treinoDataFim) {

                    const dataFim = new Date(treino.treinoDataIn);

                    dataFim.setDate(dataFim.getDate() + 10);

=======
=======
>>>>>>> e912fb5 (consulta)
    },{ 
        tableName: 'treino',
        timeStamps: false,

        hooks:{
<<<<<<< HEAD
            beforeValidate: (treino)=>{
                if(!treino.treinoDataFim){
                    const dataFim = treino.treinoDataIn;
                    
                    dataFim.setMonth(dataFim.getMonth() + 6);
>>>>>>> 68a535c (modelo)
                    treino.treinoDataFim = dataFim;
=======
            beforeValidate: (ficha)=>{
                if(!ficha.treinoDataFim){
                    const dataFim = ficha.treinoDataIn;
                    
                    dataFim.setDate(dataFim.getDate() + 10);
                    ficha.treinoDataFim = dataFim;
>>>>>>> e912fb5 (consulta)
                }
            }
        }
    });

<<<<<<< HEAD
    return Treino;
}
=======
<<<<<<<< HEAD:models/ficha.js
    return Ficha;
}
>>>>>>> 37bc233 (em desenvolvimento...)
========
    return Treino;
}
>>>>>>>> e912fb5 (consulta):models/treino.js
>>>>>>> e912fb5 (consulta)
