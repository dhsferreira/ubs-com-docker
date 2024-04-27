const UbsModel = require('../services/UbsModel');

module.exports = {
buscarTodos: async (req, res) => {
    let json = { error: '', result: [] };

    try {
        // Chama a função do model para buscar todas as UBS com os nomes das áreas associadas
        let ubsComAreas = await UbsModel.buscarTodos();

        // Formata a resposta para incluir os dados das UBS e as áreas concatenadas
        for (let i = 0; i < ubsComAreas.length; i++) {
            let ubs = ubsComAreas[i];
            json.result.push({
                ubs_id: ubs.ubs_id,
                ubs_nome: ubs.ubs_nome,
                // Inclua outros campos da tabela Ubs conforme necessário
                areas: ubs.areas // Aqui usamos o resultado da concatenação das áreas
            });
        }

        res.json(json);
    } catch (error) {
        // Se ocorrer um erro, envie uma resposta de erro
        json.error = 'Erro ao buscar todas as UBS.';
        res.status(500).json(json);
    }
},

  

}