const db = require('../db')

module.exports ={
  umaconsul: (paci_id, data) => {
    return new Promise((aceito, recusado) => {
        let query = `
            SELECT 
                paciente.paci_nome, 
                paciente.paci_cpf, 
                ubs.ubs_nome, 
                areas_medicas.area_nome, 
                DATE_FORMAT(datas_horarios.horarios_dia, '%d/%m/%Y') AS horarios_dia, 
                datas_horarios.horarios_horarios,
                consulta.consul_estado
            FROM 
                consulta
            INNER JOIN paciente ON consulta.paci_id = paciente.paci_id
            INNER JOIN ubs ON consulta.ubs_id = ubs.ubs_id
            INNER JOIN areas_medicas ON consulta.area_id = areas_medicas.area_id
            INNER JOIN datas_horarios ON consulta.horarios_id = datas_horarios.horarios_id
            WHERE
                consulta.paci_id = ?
        `;

        if (data) {
            query += ` AND DATE(datas_horarios.horarios_dia) = ?`;
        }

        db.query(query, data ? [paci_id, data] : [paci_id], (error, results) => {
            if (error) {
                recusado({ error: 'Ocorreu um erro ao buscar a consulta.', details: error });
                return;
            }

            const consultas = results.map(consulta => {
                let estado_texto;
                switch (consulta.consul_estado) {
                    case 1:
                        estado_texto = 'Em espera';
                        break;
                    case 2:
                        estado_texto = 'Em andamento';
                        break;
                    case 3:
                        estado_texto = 'Finalizada';
                        break;
                    case 4:
                        estado_texto = 'Cancelada';
                        break;
                    default:
                        estado_texto = 'Estado desconhecido';
                }
                return {
                    paci_nome: consulta.paci_nome,
                    paci_cpf: consulta.paci_cpf,
                    ubs_nome: consulta.ubs_nome,
                    area_nome: consulta.area_nome,
                    horarios_dia: consulta.horarios_dia, // Data já formatada
                    horarios_horarios: consulta.horarios_horarios,
                    consul_estatos: estado_texto
                };
            });

            aceito(consultas);
        });
    });
},

      
      



criarConsulta: (paci_id, ubs_id, area_id, horarios_id, consul_estado) => {
    return new Promise((aceito, recusado) => {
        const query = 'INSERT INTO consulta (paci_id, ubs_id, area_id, horarios_id, consul_estado) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [paci_id, ubs_id, area_id, horarios_id, consul_estado], (error, results) => {
            if (error) {
                recusado({ error: 'Erro ao criar a consulta.', details: error });
                return;
            }
            aceito(results.insertId); // Retorna o ID da consulta criada
        });
    });
},

buscarConsultasPorData: (dia) => {
    return new Promise((aceito, recusado) => {
      db.query(
        `SELECT  paciente.paci_nome, areas_medicas.area_nome, datas_horarios.horarios_dia, datas_horarios.horarios_horarios,consulta.consul_estado
        FROM consulta
        INNER JOIN datas_horarios ON consulta.horarios_id = datas_horarios.horarios_id
        INNER JOIN paciente ON consulta.paci_id = paciente.paci_id
        INNER JOIN areas_medicas ON consulta.area_id = areas_medicas.area_id
        WHERE DATE(datas_horarios.horarios_dia) = ?`,
        [dia],
        (error, results) => {
          if (error) {
            recusado({ error: 'Erro ao buscar as consultas.', details: error });
            return;
          }
  
          // Mapeamento dos estados das consultas para texto
          const consultas = results.map(consulta => {
            let estado_texto;
            switch (consulta.consul_estado) {
              case 1:
                estado_texto = 'Em espera';
                break;
              case 2:
                estado_texto = 'Em andamento';
                break;
              case 3:
                estado_texto = 'Finalizada';
                break;
              case 4:
                estado_texto = 'Cancelada';
                break;
              default:
                estado_texto = 'Estado desconhecido';
            }
            // Retorna um novo objeto com as informações relevantes e o texto do estado
            return {
              paci_nome: consulta.paci_nome,
              area_nome: consulta.area_nome,
              horarios_dia: consulta.horarios_dia,
              horarios_horarios: consulta.horarios_horarios,
              consul_estatos: estado_texto
            };
          });
  
          aceito(consultas);
        }
      );
    });
  }
  


}
