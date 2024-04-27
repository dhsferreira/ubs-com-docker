const RecepcionistaModel = require('../services/RecepcionistaModel');

module.exports = {

    buscarTodos: async (req, res)=>{                  // -------------------------LISTAR TODOS--------------------------------- //
        let json ={error:'', result:[]};

        let recepcionista = await RecepcionistaModel.buscarTodos();  

        for(let i in recepcionista){
            json.result.push({
                recep_nome: recepcionista[i].recep_nome,
                recep_CPF: recepcionista[i].recep_CPF,
                recep_cel: recepcionista[i].recep_cel, 
                recep_email: recepcionista[i].recep_email, 
                recep_senha: recepcionista[i].recep_senha, 
            });
        }
        res.json(json);
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };
    
        let nome = req.body.recep_nome;
        let CPF = req.body.recep_CPF;
        let telefone = req.body.recep_cel;
        let email = req.body.recep_email;
        let senha = req.body.recep_senha;
    
        if (nome && CPF && telefone && email && senha) {
            try {
                let recep_id = await RecepcionistaModel.inserir(nome, CPF, telefone, email, senha);
                json.result = {
                    recep_id: recep_id,
                    nome: nome,
                    CPF: CPF,
                    telefone: telefone,
                    email: email,
                    senha: senha
                };
            } catch (error) {
                json.error = 'Erro ao inserir os dados do recepcionista: ' + error.message;
            }
        } else {
            json.error = 'Campos obrigatórios não foram enviados corretamente';
        }
    
        res.json(json);
    },
    

    login: async (req, res) => {
        let json = { error: '', message: '' };
    
        try {
            const { recep_CPF, recep_senha } = req.body;
    
            console.log('CPF fornecido:', recep_CPF);
            console.log('Senha fornecida:', recep_senha);
    
            // Verifica o login do Recepcionista no modelo
            const recep = await RecepcionistaModel.verificarLogin(recep_CPF, recep_senha);
    
            if (recep) {
                json.message = `Login bem-sucedido!`;
            } else {
                json.error = 'CPF ou senha inválidos.';
            }
    
            res.json(json);
        } catch (error) {
            json.error = 'Erro ao processar a solicitação de login.';
            res.status(500).json(json);
        }
    },
    
    // Adicione esta função ao seu controlador de consulta
alterarEstadoConsulta: async (req, res) => {
    let json = { error: '', result: {} };

    try {
        const { consul_id } = req.params;
        const { consul_estado } = req.body;

        if (!consul_id || consul_estado === undefined) {
            json.error = 'ID da consulta ou novo estado não fornecido';
            res.status(400).json(json);
            return;
        }

        // Chama a função do modelo para alterar o estado da consulta
        await RecepcionistaModel.alterarEstadoConsulta(consul_id, consul_estado);

        json.result = 'Estado da consulta alterado com sucesso';
        res.json(json);
    } catch (error) {
        console.error('Erro ao processar solicitação de alteração de estado da consulta:', error);
        json.error = 'Erro ao processar solicitação de alteração de estado da consulta';
        res.status(500).json(json);
    }
},

adicionarHorarioEArea: async (req, res) => {
    try {
        const { horarios_dia, horarios_horarios } = req.body;
        const area_id = req.params.area_id;

        // Adicionar horário e vincular à área
        const { horarios_id } = await RecepcionistaModel.adicionarHorarioEArea(horarios_dia, horarios_horarios, area_id);

        res.json({ message: 'Horário adicionado com sucesso à área.', horarios_id, area_id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar horário à área.', details: error });
    }
},



    
}