module.exports = (sequelize, Sequelize, DataTypes)=>{
    const Treino = sequelize.define('ficha', {
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
                        throw new Error('Data de fim deve ser posterior à data de início', {statusCode: 500});
                    }
                }
            }
        }
    },{ 
        tableName: 'treino',
        timeStamps: false,

        hooks:{
            beforeValidate: (ficha)=>{
                if(!ficha.treinoDataFim){
                    const dataFim = ficha.treinoDataIn;
                    
                    dataFim.setDate(dataFim.getDate() + 10);
                    ficha.treinoDataFim = dataFim;
                }
            }
        }
    });

    return Treino;
}