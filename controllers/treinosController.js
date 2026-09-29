const db = require('../config/db_sequelize');
const path = require('path');

exports.exibirIndexTreino = (req, res)=>{
    res.sendFile(path.join(__dirname, '../pages/indexTreinos.html'));
}

exports.listarTodos = async (req, res)=>{
    try {
        const pagina = Math.max(parseInt(req.query.pagina) || 1, 1);
        const limite = 10;
        const offset = (pagina - 1) * limite;

        const resultado = await Ficha.findAndCountAll({
            limit: limite,
            offset: offset,
            order: [['id', 'ASC']]
        });

        res.json({
            registros: resultado.rows,
            total: resultado.count,
            pagina: pagina,
            totalPaginas: Math.ceil(resultado.count / limite)
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao consultar treinos');
    }
}

exports.consultarPk = async (req, res)=>{
    try{
        const treino = await db.treino.findByPk(req.params.id);

        if(!treino) return res.status(404).json({erro: 'Treino não encontrado'});
        return res.json(treino);
    }catch(e){
        return res.status(500).send('Erro interno do banco');
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
    try{
        const treino = await db.treino.findByPk(req.params.id);
        
        if(!treino){ res.status(404).send('Treino não encontrado'); return;}
        if(req.body.treinoNome === '') req.body.treinoNome = treino.treinoNome;
        if(req.body.treinoObjetivo === '') req.body.treinoObjetivo = treino.treinoObjetivo;
        if(req.body.treinoDataFim === '') req.body.treinoDataFim = treino.treinoDataFim;

        const nLinhas = await treino.update({
            treinoNome: req.body.treinoNome,
            treinoObjetivo: req.body.treinoObjetivo,
            treinoDataFim: req.body.treinoDataFim
        });

        if(nLinhas > 0 ) res.status(200).send('Atualização concluída com sucesso');
    } catch(e){
        return res.json(e);
    }
}

exports.deletar = async (req, res)=>{
    try{
        const treino = await db.treino.findByPk(req.params.id);

        if(!plano){ res.status(404).send('Treino não encontrado'); return;}
        else{
            const nLinhas = await treino.destroy();

            if(nLinhas > 0) res.status(200).send(`Plano deletado, ${nlinhas-1} outros registros afetados`);
        }
    } catch(e){
        return res.json(e);
    }
}