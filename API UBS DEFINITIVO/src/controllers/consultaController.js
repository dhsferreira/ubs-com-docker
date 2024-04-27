const consultaModel = require('../services/consultaModel');

module.exports = {
   umaconsul: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            let paci_id = req.params.paci_id; // Obtém o paci_id a partir dos parâmetros da requisição

            // Chama a função do model para buscar a consulta com o paci_id especificado
            let consulta = await consultaModel.umaconsul(paci_id);

               // Formata a resposta para incluir os dados das consutas
      json.result = consulta;

      res.json(json);
  } catch (error) {
      // Se ocorrer um erro, envie uma resposta de erro
      json.error = 'Erro ao buscar as consultas.';
      res.status(500).json(json);
  }
},




    criarConsulta: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            // Extrai os dados da requisição
            const { paci_id, ubs_id, area_id, horarios_id, consul_estado } = req.body;

            // Chama a função do modelo para criar a consulta
            const consulta_id = await consultaModel.criarConsulta(paci_id, ubs_id, area_id, horarios_id, consul_estado);

            // Formata a resposta com o ID da consulta criada
            json.result = { consulta_id };

            res.json(json);
        } catch (error) {
            // Se ocorrer um erro, envia uma resposta de erro
            json.error = 'Erro ao criar a consulta.';
            res.status(500).json(json);
        }
    },
    buscarConsultasPorData: async (req, res) => {
        let json = { error: '', result: [] };
      
        try {
            let dia = req.params.dia;
      
            let consultasPorDia = await consultaModel.buscarConsultasPorData(dia);
      
            json.result = consultasPorDia;
      
            res.json(json);
        } catch (error) {
            json.error = 'Erro ao buscar as consultas por dia.';
            res.status(500).json(json);
        }
      }
      
}

