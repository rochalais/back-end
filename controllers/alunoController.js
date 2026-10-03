const db = require('../config/db_sequelize');

const path = require('path');
const fs = require('fs');

if (!fs.existsSync(path.join(__dirname, '../logs'))) {
    fs.mkdirSync(path.join(__dirname, '../logs'));
}

function registrarErro(erro) {
    const mensagem = new Date().toLocaleString() + ' - ' + erro.message + '\n';
    fs.appendFileSync(path.join(__dirname, '../logs/errors.log'), mensagem);
}

exports.listar = async (req, res) => {

    try {

        if (req.query.planoId) {

            const alunos = await db.aluno.findAll({
                where: {
                    planoId: req.query.planoId
                }
            });

            res.json(alunos);

        } else {

            const alunos = await db.aluno.findAll();

            res.json(alunos);

        }

    } catch (erro) {

        registrarErro(erro);
        res.status(500).send('Erro ao listar alunos');

    }

};

exports.buscarPorId = async (req, res) => {

    try {

        const aluno = await db.aluno.findByPk(req.params.id);

        if (!aluno) {
            return res.status(404).send('Aluno não encontrado');
        }

        res.json(aluno);

    } catch (erro) {

        registrarErro(erro);
        res.status(500).send('Erro ao buscar aluno');

    }

};

exports.exibirCadastro = (req, res) => {

    res.sendFile(path.join(__dirname, '../pages/cadastroAluno.html'));

};

exports.exibirDeletar = (req, res) => {

    res.sendFile(path.join(__dirname, '../pages/deletarAluno.html'));

};

exports.exibirAtualizar = (req, res) => {

    res.sendFile(path.join(__dirname, '../pages/atualizarAluno.html'));

};

exports.cadastrar = async (req, res) => {

    try {

        if (!req.body.nome || !req.body.cpf || !req.body.email || !req.body.telefone || !req.body.dataNascimento || !req.body.planoId) {

            return res.status(400).send('Todos os campos são obrigatórios');

        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email);

        if (!emailValido) {
            return res.status(400).send('E-mail inválido');
        }

        const aluno = await db.aluno.findOne({
            where: {
                cpf: req.body.cpf
            }
        });

        if (aluno) {
            return res.status(400).send('CPF já cadastrado');
        }

        const plano = await db.plano.findByPk(req.body.planoId);

        if (!plano) {
            return res.status(400).send('Plano não encontrado');
        }

        await db.aluno.create({

            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            dataNascimento: req.body.dataNascimento,
            planoId: req.body.planoId

        });

        res.send('Aluno cadastrado');

    } catch (erro) {

        registrarErro(erro);
        res.status(500).send('Erro ao cadastrar aluno');

    }

};

exports.deletar = async (req, res) => {

    try {

        const aluno = await db.aluno.findByPk(req.params.id);

        if (!aluno) {
            return res.status(404).send('Aluno não encontrado');
        }

        await aluno.destroy();

        res.send('Aluno deletado');

    } catch (erro) {

        registrarErro(erro);
        res.status(500).send('Erro ao deletar aluno');

    }

};

exports.atualizar = async (req, res) => {

    try {

        if (!req.body.nome || !req.body.cpf || !req.body.email || !req.body.telefone || !req.body.dataNascimento || !req.body.planoId) {

            return res.status(400).send('Todos os campos são obrigatórios');

        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email);

        if (!emailValido) {
            return res.status(400).send('E-mail inválido');
        }

        const aluno = await db.aluno.findByPk(req.params.id);

        if (!aluno) {

            return res.status(404).send('Aluno não encontrado');

        }

        const outroAluno = await db.aluno.findOne({
            where: {
                cpf: req.body.cpf
            }
        });

        if (outroAluno && outroAluno.id !== aluno.id) {

            return res.status(400).send('CPF já cadastrado');

        }

        const plano = await db.plano.findByPk(req.body.planoId);

        if (!plano) {

            return res.status(400).send('Plano não encontrado');

        }

        await aluno.update({

            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            dataNascimento: req.body.dataNascimento,
            planoId: req.body.planoId

        });

        res.send('Aluno atualizado');

    } catch (erro) {

        registrarErro(erro);
        res.status(500).send('Erro ao atualizar aluno');

    }

};