const HorarioModel = require ('../services/HorarioModel')

module.exports = {
   
// Controller
buscarUm: async (req, res) => {
  let json = { error: '', result: [] };

  try {
      let area_id = req.params.area_id; // Obtém o area_id a partir dos parâmetros da requisição

      // Chama a função do model para buscar os horários associados à area_id especificada
      let horarios = await HorarioModel.buscarUm(area_id);

      // Formata a resposta para incluir os dados dos horários
      json.result = horarios;

      res.json(json);
  } catch (error) {
      // Se ocorrer um erro, envie uma resposta de erro
      json.error = 'Erro ao buscar os horários.';
      res.status(500).json(json);
  }
},
buscarHorariosdoDia: async (req, res) => {
  let json = { error: '', result: [] };

  try {
      let area_id = req.params.area_id; // Obtém o area_id a partir dos parâmetros da requisição

      // Chama a função do model para buscar os horários por dia associados à area_id especificada
      let horariosPorDia = await HorarioModel.buscarHorariosdoDia(area_id);

      // Formata a resposta para incluir os dados dos horários agrupados por dia
      json.result = horariosPorDia;

      res.json(json);
  } catch (error) {
      // Se ocorrer um erro, envie uma resposta de erro
      json.error = 'Erro ao buscar os horários por dia.';
      res.status(500).json(json);
  }
},

buscarHorariosPorDia: async (req, res) => {
  let json = { error: '', result: [] };

  try {
    let area_id = req.params.area_id; // Obtém o area_id a partir dos parâmetros da requisição
    let dia = req.params.dia;         // Obtém o dia a partir dos parâmetros da requisição

    // Chama a função do model para buscar os horários por dia associados à area_id e dia especificados
    let horariosPorDia = await HorarioModel.buscarHorariosPorDia(area_id, dia);

    // Formata a resposta para incluir os dados dos horários do dia específico
    json.result = horariosPorDia;

    res.json(json);
  } catch (error) {
    // Se ocorrer um erro, envie uma resposta de erro
    json.error = 'Erro ao buscar os horários por dia.';
    res.status(500).json(json);
  }
}





}
   
