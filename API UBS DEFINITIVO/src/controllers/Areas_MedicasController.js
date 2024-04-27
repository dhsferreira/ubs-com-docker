const Areas_MedicasModel = require ('../services/Areas_MedicasModel')

module.exports = {
  buscarAreasPorUBS: async (req, res) => {
    let json = { error: '', result: {} };
  
    try {
      let ubs_id = req.params.ubs_id; // Obtém o ubs_id a partir dos parâmetros da requisição
  
      // Chama a função do model para buscar as áreas com o ubs_id especificado
      let areas = await Areas_MedicasModel.buscarAreasPorUBS(ubs_id);
  
      // Formata a resposta para incluir os dados das áreas
      json.result = areas;
  
      res.json(json);
    } catch (error) {
      // Se ocorrer um erro, envie uma resposta de erro
      json.error = 'Erro ao buscar as áreas.';
      res.status(500).json(json);
    }
  }
  
}
   
