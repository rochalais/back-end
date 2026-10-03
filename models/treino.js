<<<<<<< HEAD
module.exports = (sequelize, Sequelize) => {

    const Treino = sequelize.define('treino', {
        treinoId: {
            type: Sequelize.INTEGER,
=======
const { Sequelize, DataTypes } = require("../config/db_sequelize");

module.exports = (sequelize, Sequelize)=>{
    const Ficha = sequelize.define('treino', {
        treinoId:{
            type: DataTypes.INTEGER,
>>>>>>> 68a535c (modelo)
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
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
                        throw new Error('Data de fim deve ser posterior à data de início');
>>>>>>> 68a535c (modelo)
                    }
                }
            }
        }
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
    },{ 
        tableName: 'treino',
        timeStamps: false,

        hooks:{
            beforeValidate: (treino)=>{
                if(!treino.treinoDataFim){
                    const dataFim = treino.treinoDataIn;
                    
                    dataFim.setMonth(dataFim.getMonth() + 6);
>>>>>>> 68a535c (modelo)
                    treino.treinoDataFim = dataFim;
                }
            }
        }
    });

    return Treino;
}