module.exports = (sequelize, Sequelize) => {

    const Aluno = sequelize.define('aluno', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        cpf: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        telefone: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        dataNascimento: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            field: 'data_nascimento'
        },
        planoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'plano_id'
        }
    }, {
        tableName: 'aluno',
        timestamps: false
    });

    return Aluno;
}