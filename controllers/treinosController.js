const db = require('../config/db_sequelize');
const path = require('path');

exports.listarTodos = async (req, res)=>{

}

exports.consultarPk = async (req, res)=>{
    try{
        const treino = await db.treino.findByPk(req.params.id);

        if(!treino) return res.status(404).json({erro: 'Treino não encontrado'});
        return res.json(treino);
    }catch(e){
        return res.status(500).json({erro: 'Erro interno do banco'});
    }
}

exports.cadastrar = async (req, res)=>{
    if(req.body.treino_data_in === '') req.body.treino_data_in = undefined;
    if(req.body.treino_data_fim === '') req.body.treino_data_fim = undefined;

    try{
        await db.treino.create({
            treinoNome: req.body.treino_nome,
            treinoObjetivo: req.body.treino_objetivo,
            treinoDataIn: req.body.treino_data_in,
            treinoDataFim: req.body.treino_data_fim
        });
    } catch(error){
        return res.json(error)
    }
    res.send('Treino cadastrado');
}

exports.atualizar = async (req, res)=>{

}

exports.deletar = async (req, res)=>{

}