const db = require ('../db')

module.exports = {
  

// Model
buscarUm: (area_id) => {
    return new Promise((aceito, recusado) => {
        db.query(
            'SELECT datas_horarios.horarios_dia, datas_horarios.horarios_horarios, datas_horarios.horarios_dispo ' +
            'FROM datas_horarios ' +
            'INNER JOIN horarios_areas ON datas_horarios.horarios_id = horarios_areas.horarios_id ' +
            'WHERE horarios_areas.area_id = ?',
            [area_id],
            (error, results) => {
                if (error) {
                    recusado({ error: 'Erro ao buscar os horários.', details: error });
                    return;
                }
  
                aceito(results);
            }
        );
    });
  },

  buscarHorariosdoDia: (area_id) => {
    return new Promise((aceito, recusado) => {
        db.query(
            'SELECT DATE(horarios_dia) AS dia, GROUP_CONCAT(horarios_horarios ORDER BY horarios_horarios ASC) AS horarios, GROUP_CONCAT(horarios_dispo ORDER BY horarios_horarios ASC) AS horarios_dispo ' +
            'FROM datas_horarios ' +
            'INNER JOIN horarios_areas ON datas_horarios.horarios_id = horarios_areas.horarios_id ' +
            'WHERE horarios_areas.area_id = ? ' +
            'GROUP BY dia',
            [area_id],
            (error, results) => {
                if (error) {
                    recusado({ error: 'Erro ao buscar os horários.', details: error });
                    return;
                }

                aceito(results);
            }
        );
    });
},

buscarHorariosPorDia: (area_id, dia) => {
  return new Promise((aceito, recusado) => {
      db.query(
          'SELECT horarios_horarios, horarios_dispo ' +
          'FROM datas_horarios ' +
          'INNER JOIN horarios_areas ON datas_horarios.horarios_id = horarios_areas.horarios_id ' +
          'WHERE horarios_areas.area_id = ? AND DATE(datas_horarios.horarios_dia) = ?',
          [area_id, dia],
          (error, results) => {
              if (error) {
                  recusado({ error: 'Erro ao buscar os horários.', details: error });
                  return;
              }

              aceito(results);
          }
      );
  });
}

  



  
}
