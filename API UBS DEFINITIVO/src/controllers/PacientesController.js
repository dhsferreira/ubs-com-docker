const PacienteModel = require('../services/PacienteModel');

module.exports = {

  buscarTodos: async (req, res) => { // -------------------------LISTAR TODOS--------------------------------- //
let json = {error:'', result:[]};

let pacientes = await PacienteModel.buscarTodos();   

for(let i in pacientes){
    json.result.push({
        paciente_nome: pacientes[i].paci_nome,
        paciente_data_nascimento: pacientes[i].paci_data_nascimento,
        paciente_CPF: pacientes[i].paci_CPF,
        paciente_cel: pacientes[i].paci_cel,
        paciente_email: pacientes[i].paci_email,
        paciente_endereco: pacientes[i].paci_endereco,
        paci_senha: pacientes[i].paci_senha,
    });
}
res.json(json);
},

    
    buscarUm: async (req, res) => { // ----------------------------LISTAR SOMENTE UM ------------------------------//
            let json = { error: '', result: {} };
        
            try {
                let paci_id = req.params.paci_id;
                let paciente = await PacienteModel.buscarUm(paci_id);
        
                if (paciente) {
                    json.result = paciente;
                } else {
                    json.error = 'Paciente não encontrado';
                }
        
            } catch (error) {
                json.error = 'Erro ao buscar paciente: ' + error.message;
            }
        
            res.json(json);
        },
        

    inserir:  async (req, res) => {         // ----------------------------INSERIR DADOS------------------------------//
        let json ={error:'', result:{}};

        let nome = req.body.paci_nome;
        let dataNascimento = req.body.paci_data_nascimento;
        let CPF = req.body.paci_CPF;
        let telefone = req.body.paci_cel;
        let email = req.body.paci_email;
        let endereco = req.body.paci_endereco;
        let senha = req.body.paci_senha;


        if (nome && dataNascimento && CPF && telefone && email && endereco && senha){
            let paci_id = await PacienteModel.inserir(nome, dataNascimento, CPF, telefone, email,endereco, senha);
            json.result = {
                paci_id: paci_id,
                nome,
                dataNascimento,
                CPF,
                telefone,
                email,
                endereco,
                senha
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },


alterarDadosPaciente: async (req, res) => {
    let json = { error: '', result: {} };

    try {
        const { paci_id } = req.params;
        const dadosPaciente = req.body;

        if (!paci_id) {
            json.error = 'ID do paciente não fornecido';
            res.status(400).json(json);
            return;
        }

        // Chama a função do modelo para alterar os dados do paciente
        await PacienteModel.alterarDadosPaciente(paci_id, dadosPaciente);

        json.result = 'Dados do paciente alterados com sucesso';
        res.json(json);
    } catch (error) {
        console.error('Erro ao processar solicitação de alteração de dados do paciente:', error);
        json.error = 'Erro ao processar solicitação de alteração de dados do paciente';
        res.status(500).json(json);
    }
},


    excluir:  async (req, res) => {  
        let json ={error:'', result:{}};

        await PacienteModel.excluir(req.params.paci_id);

        res.json(json);

    },
    // Controlador para lidar com a solicitação de login do paciente
    login: async (req, res) => {
        let json = { error: '', message: '' };
      
        try {
          const { paci_email, paci_senha } = req.body;
      
          console.log('Email fornecido:', paci_email);
          console.log('Senha fornecida:', paci_senha);
      
          // Verifica o login do paciente no modelo
          const paciente = await PacienteModel.verificarLoginByEmail(paci_email, paci_senha);
      
          if (paciente) {
            json.message = `Login bem-sucedido!`;
          } else {
            json.error = 'Email ou senha inválidos.';
          }
      
          res.json(json);
        } catch (error) {
          console.error('Erro ao processar a solicitação de login:', error);
          json.error = 'Erro ao processar a solicitação de login.';
          res.status(500).json(json);
        }
    },
      
      
  
}