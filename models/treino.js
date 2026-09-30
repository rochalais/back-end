module.exports = (sequelize, Sequelize, DataTypes)=>{
    const Treino = sequelize.define('treino', {
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
            beforeValidate: (treino)=>{
                if(!treino.treinoDataFim){
                    const dataFim = new Date(treino.treinoDataIn);
                    
                    dataFim.setDate(dataFim.getDate() + 10);
                    treino.treinoDataFim = dataFim;
                }
            }
        }
    });

    return Treino;
}