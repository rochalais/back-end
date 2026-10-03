module.exports = (sequelize, Sequelize) => {

    const Treino = sequelize.define('treino', {
        treinoId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

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
                    }
                }
            }
        }

    }, {
        tableName: 'treino',
        timestamps: false,

        hooks: {
            beforeValidate: (treino) => {

                if (!treino.treinoDataFim) {

                    const dataFim = new Date(treino.treinoDataIn);

                    dataFim.setDate(dataFim.getDate() + 10);

                    treino.treinoDataFim = dataFim;
                }
            }
        }
    });

    return Treino;
}