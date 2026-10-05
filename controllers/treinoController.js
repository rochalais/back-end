const db = require('../config/db_sequelize');

const path = require('path');
const fs = require('fs');

if (!fs.existsSync(path.join(__dirname, '../logs'))) {
    fs.mkdirSync(path.join(__dirname, '../logs'));
}

function registrarErro(erro) {
    const mensagem =
        new Date().toLocaleString() +
        ' - ' +
        erro.message +
        '\n';

    fs.appendFileSync(
        path.join(__dirname, '../logs/errors.log'),
        mensagem
    );
}

function inteiroValido(valor) {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
}

function dataValida(valor) {
    return !isNaN(new Date(valor).getTime());
}


// GET /treinos
// GET /treinos?alunoId=5

exports.listar = async (req, res) => {

    try {

        if (req.query.alunoId) {

            if (!inteiroValido(req.query.alunoId)) {
                return res.status(400).send('alunoId inválido');
            }

            const treinos = await db.treino.findAll({
                where: {
                    alunoId: req.query.alunoId
                },
                include: [{
                    model: db.aluno,
                    attributes: ['id', 'nome']
                }]
            });

            res.json(treinos);

        } else {

            const treinos = await db.treino.findAll({
                include: [{
                    model: db.aluno,
                    attributes: ['id', 'nome']
                }]
            });

            res.json(treinos);
        }

    } catch (erro) {

        console.error('ERRO AO LISTAR TREINOS:', erro);
        registrarErro(erro);

        res.status(500).send('Erro ao listar treinos');

    }
};


// GET /treinos/:id

exports.buscarPorId = async (req, res) => {

    try {

        if (!inteiroValido(req.params.id)) {
            return res.status(400).send('Id inválido');
        }

        const treino = await db.treino.findByPk(req.params.id, {
            include: [{
                model: db.aluno,
                attributes: ['id', 'nome']
            }]
        });

        if (!treino) {
            return res.status(404).send('Treino não encontrado');
        }

        res.json(treino);

    } catch (erro) {

        registrarErro(erro);
        res.status(500).send('Erro ao buscar treino');

    }
};


// POST /treinos

exports.cadastrar = async (req, res) => {

    try {

        if (
            !req.body.treinoNome ||
            !req.body.treinoObjetivo ||
            !req.body.alunoId
        ) {
            return res.status(400).send(
                'Os campos treinoNome, treinoObjetivo e alunoId são obrigatórios'
            );
        }

        if (!inteiroValido(req.body.alunoId)) {
            return res.status(400).send('alunoId inválido');
        }

        if (
            req.body.treinoDataIn &&
            !dataValida(req.body.treinoDataIn)
        ) {
            return res.status(400).send('Data de início inválida');
        }

        if (
            req.body.treinoDataFim &&
            !dataValida(req.body.treinoDataFim)
        ) {
            return res.status(400).send('Data de fim inválida');
        }

        const dataIn =
            req.body.treinoDataIn || new Date();

        if (
            req.body.treinoDataFim &&
            new Date(req.body.treinoDataFim) <= new Date(dataIn)
        ) {
            return res.status(400).send(
                'Data de fim deve ser posterior à data de início'
            );
        }

        const aluno = await db.aluno.findByPk(req.body.alunoId);

        if (!aluno) {
            return res.status(400).send('Aluno não encontrado');
        }

        await db.treino.create({

            treinoNome: req.body.treinoNome,
            treinoObjetivo: req.body.treinoObjetivo,
            alunoId: req.body.alunoId,
            treinoDataIn: req.body.treinoDataIn,
            treinoDataFim: req.body.treinoDataFim

        });

        res.send('Treino cadastrado');

    } catch (erro) {

        console.error('ERRO AO CADASTRAR TREINO:', erro);
        registrarErro(erro);

        res.status(500).send('Erro ao cadastrar treino');

    }
};


// PUT /treinos/:id

exports.atualizar = async (req, res) => {

    try {

        if (!inteiroValido(req.params.id)) {
            return res.status(400).send('Id inválido');
        }

        if (
            !req.body.treinoNome ||
            !req.body.treinoObjetivo ||
            !req.body.alunoId
        ) {
            return res.status(400).send(
                'Os campos treinoNome, treinoObjetivo e alunoId são obrigatórios'
            );
        }

        if (!inteiroValido(req.body.alunoId)) {
            return res.status(400).send('alunoId inválido');
        }

        const treino = await db.treino.findByPk(req.params.id);

        if (!treino) {
            return res.status(404).send('Treino não encontrado');
        }

        const dataIn =
            req.body.treinoDataIn || treino.treinoDataIn;

        const dataFim =
            req.body.treinoDataFim || treino.treinoDataFim;

        if (new Date(dataFim) <= new Date(dataIn)) {
            return res.status(400).send(
                'Data de fim deve ser posterior à data de início'
            );
        }

        const aluno =
            await db.aluno.findByPk(req.body.alunoId);

        if (!aluno) {
            return res.status(400).send('Aluno não encontrado');
        }

        await treino.update({

            treinoNome: req.body.treinoNome,
            treinoObjetivo: req.body.treinoObjetivo,
            alunoId: req.body.alunoId,
            treinoDataIn: dataIn,
            treinoDataFim: dataFim

        });

        res.send('Treino atualizado');

    } catch (erro) {

        registrarErro(erro);
        res.status(500).send('Erro ao atualizar treino');

    }
};


// DELETE /treinos/:id

exports.deletar = async (req, res) => {

    try {

        if (!inteiroValido(req.params.id)) {
            return res.status(400).send('Id inválido');
        }

        const treino =
            await db.treino.findByPk(req.params.id);

        if (!treino) {
            return res.status(404).send('Treino não encontrado');
        }

        await treino.destroy();

        res.send('Treino deletado');

    } catch (erro) {

        registrarErro(erro);
        res.status(500).send('Erro ao deletar treino');

    }
};


// Páginas de Treino

exports.exibirCadastro = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/cadastroTreino.html'));
};

exports.exibirAtualizar = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/atualizarTreino.html'));
};

exports.exibirDeletar = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/deletarTreino.html'));
};