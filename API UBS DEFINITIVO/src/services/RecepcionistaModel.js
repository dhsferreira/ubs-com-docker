const db = require('../db')

module.exports = {
    buscarTodos: () =>{        // -------------------------LISTAR TODOS--------------------------------- //
        return new Promise((aceito, recusado)=>{
    
            db.query('SELECT * FROM recepcionista', (error, results)=>{
                if(error) { recusado(error); return; }
                aceito(results);
            });
        });
    },
    

// Model
inserir: (recep_nome, recep_CPF, recep_cel, recep_email, recep_senha) => {
    return new Promise((aceito, recusado) => {
        db.query('INSERT INTO recepcionista (recep_nome, recep_CPF, recep_cel, recep_email, recep_senha) VALUES (?,?,?,?,?)',
            [recep_nome, recep_CPF, recep_cel, recep_email, recep_senha],
            (error, results) => {
                if (error) {
                    recusado(new Error('Erro ao inserir os dados do recepcionista: ' + error.message));
                    return;
                }
                aceito(results.insertId);
            }
        );
    });
},

verificarLogin: (recep_CPF, recep_senha) => {
    return new Promise((aceito, recusado) => {
      db.query(
        'SELECT * FROM recepcionista WHERE recep_CPF = ? AND recep_senha = ?',
        [recep_CPF, recep_senha],
        (error, results) => {
          if (error) {
            recusado({ error: 'Erro ao verificar o login da recepcionista.', details: error });
            return;
          }
  
          if (results.length > 0) {
            aceito(true); // Login bem-sucedido
          } else {
            aceito(false); // Login falhou
          }
        }
      );
    });
  },
  // Adicione esta função ao seu modelo de consulta
alterarEstadoConsulta: (consul_id, consul_estado) => {
    return new Promise((aceito, recusado) => {
        db.query(
            'UPDATE consulta SET consul_estado = ? WHERE consul_id = ?',
            [consul_estado, consul_id],
            (error, results) => {
                if (error) {
                    console.error('Erro ao executar consulta de alteração de estado da consulta:', error);
                    recusado(error);
                    return;
                }
                console.log('Estado da consulta alterado com sucesso:', results);
                aceito(results);
            }
        );
    });
},



adicionarHorarioEArea: (horarios_dia, horarios_horarios, area_id) => {
    return new Promise((aceito, recusado) => {
        db.query(
            'INSERT INTO datas_horarios (horarios_dia, horarios_horarios, horarios_dispo) VALUES (?, ?, 1)',
            [horarios_dia, horarios_horarios],
            (error, results) => {
                if (error) {
                    recusado({ error: 'Erro ao adicionar horário.', details: error });
                    return;
                }
                
                const horarios_id = results.insertId;

                // Vincular horário à área
                db.query(
                    'INSERT INTO horarios_areas (area_id, horarios_id) VALUES (?, ?)',
                    [area_id, horarios_id],
                    (error, results) => {
                        if (error) {
                            recusado({ error: 'Erro ao vincular horário à área.', details: error });
                            return;
                        }
                        aceito({ horarios_id, area_id });
                    }
                );
            }
        );
    });
},

   

}