const { Sequelize, DataTypes } = require("../config/db_sequelize");

module.exports = (sequelize, Sequelize)=>{
    const Ficha = sequelize.define('ficha', {
        treinoId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
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
                    }
                }
            }
        }
    },{ 
        tableName: 'ficha',
        timeStamps: false,

        hooks:{
            beforeValidate: (ficha)=>{
                if(!ficha.treinoDataFim){
                    const dataFim = ficha.treinoDataIn;
                    
                    dataFim.setMonth(dataFim.getMonth() + 6);
                    ficha.treinoDataFim = dataFim;
                }
            }
        }
    });

    return Ficha;
}