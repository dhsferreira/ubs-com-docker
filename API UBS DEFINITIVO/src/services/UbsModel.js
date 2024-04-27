const db = require('../db')

module.exports = {
  
buscarTodos: () => {
    return new Promise((aceito, recusado) => {
        db.query(
            'SELECT u.ubs_nome, GROUP_CONCAT(a.area_nome SEPARATOR ", ") AS areas ' +
            'FROM Ubs u ' +
            'INNER JOIN tabela_ligacao_ubs t ON u.ubs_id = t.ubs_id ' +
            'INNER JOIN areas_medicas a ON t.area_id = a.area_id ' +
            'GROUP BY u.ubs_id',
            (error, results) => {
                if (error) {
                    recusado({ error: 'Erro ao buscar todas as UBS.', details: error });
                    return;
                }

                aceito(results);
            }
        );
    });
},


}