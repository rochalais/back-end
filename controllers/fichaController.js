const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose')
const mongo = require('../config/db_mongoose');
const db = require('../config/db_sequelize');
const ficha = require('../models/ficha');

if(!fs.existsSync(path.join(__dirname, '../logs'))) fs.mkdirSync(path.join(__dirname, '../logs'));

function log_erro(erro){
    const mensagem = new Date().toLocaleString() + ' - ' + erro.message + '\n';
    fs.appendFileSync(path.join(__dirname, '../logs/errors.log'), mensagem);
}

function log_transacao(transacao){
    const mensagem = new Date().toLocaleString() + ' - ' + transacao + '\n';
    fs.appendFileSync(path.join(__dirname, '../logs/ficha.log'), mensagem); 
}

exports.cadastrarFicha = async (req, res) => {
    try{
        const{treinoId, exercicios, dia} = req.body;

        if(exercicios.length === 0) return res.status(400).send('Informe ao menos um exercício');
        if(dia > 7 || dia < 1) return res.status(400).send('Informe um dia de semana válido');

        const treino = await db.treino.findByPk(treinoId);

        if(!treino) return res.status(404).send('Id de treino não corresponde a nenhum treino cadastrado');

        await ficha.create({treinoId, exercicios, dia}).then(ficha => {
            log_transacao(`Cadastrada ficha ${ficha._id} no treino ${ficha.treinoId}`);
            return res.status(201).send('Ficha cadastrada');
        });
    } catch(e){
        log_erro(e);

        res.status(500).send('Erro ao cadastrar ficha');
    }
}

exports.consultarPorTreinoId = async (req, res)=>{
    try{
        const treinoId = Number(req.params.treinoId);
        if (!Number.isInteger(treinoId) || treinoId < 1) {
            log_erro('Erro de consulta: treinoId inválido');
            return res.status(400).send('treinoId inválido');
        }

        const treino = await db.treino.findByPk(treinoId);
        if (!treino) return res.status(404).send('Treino não encontrado');

        const fichas = await ficha.find({ treinoId }).sort({ dia: 1 }).select('-__v').lean();
        if (fichas.length === 0) {
            return res.status(404).send('Nenhuma ficha encontrada para este treino');
        }

        res.json(fichas);

    } catch (e) {
        log_erro(e);
        res.status(500).send('Erro ao consultar fichas');
    }
}

exports.deletarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send('ID inválido');
        }

        const fichaDeletada = await ficha.findByIdAndDelete(id);

        if (!fichaDeletada) {
            return res.status(404).send('Ficha não encontrada');
        }

        log_transacao(`Deletada ficha ${fichaDeletada._id} (treino ${fichaDeletada.treinoId}, dia ${fichaDeletada.dia})`);
        return res.status(200).send('Ficha deletada');

    } catch (e) {
        log_erro(e);
        res.status(500).send('Erro ao deletar ficha');
    }
};

exports.atualizarPorId = async (req, res)=>{
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        log_erro('Tentativa de atualizar com ID inválido');
        return res.status(400).send('ID inválido');
    }

    const campos = {};
    if (req.body.dia !== undefined) campos.dia = req.body.dia;
    if (req.body.exercicios !== undefined) campos.exercicios = req.body.exercicios;

    if (Object.keys(campos).length === 0) {
        log_erro('Dados informados insuficientes para atualização');
        return res.status(400).send('Informe dia e/ou exercicios para atualizar');
    }

    if (campos.exercicios !== undefined && (!Array.isArray(campos.exercicios) || campos.exercicios.length === 0)) {
        log_erro('Dados informados insuficientes para atualização');
        return res.status(400).send('exercicios deve ser um array com ao menos um item');
    }

    ficha.findByIdAndUpdate(id, { $set: campos }, { new: true, runValidators: true }).select('-__v').then(ficha => {
        if (!ficha) return res.status(404).send('Ficha não encontrada');

        log_transacao(`Ficha ${ficha._id} atualizada (campos: ${Object.keys(campos).join(', ')})`);
        res.json({ mensagem: 'Ficha atualizada', ficha });
    }).catch(erro => {
        log_erro(erro);
        if (erro.name === 'ValidationError' || erro.name === 'CastError')return res.status(400).send(erro.message);
        if (erro.code === 11000) return res.status(409).send('Já existe uma ficha para este treino neste dia');
        
        res.status(500).send('Erro ao atualizar ficha');
    });
}

exports.exibirIndex = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/indexFichas.html'));

};
