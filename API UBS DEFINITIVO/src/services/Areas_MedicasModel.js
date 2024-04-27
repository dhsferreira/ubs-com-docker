const db = require ('../db')

module.exports = {
  buscarAreasPorUBS: (ubs_id) => {
    return new Promise((aceito, recusado) => {
      const query = `
        SELECT 
          areas_medicas.area_nome
        FROM 
          areas_medicas
        INNER JOIN tabela_ligacao_ubs ON areas_medicas.area_id = tabela_ligacao_ubs.area_id
        WHERE
          tabela_ligacao_ubs.ubs_id = ?;
      `;
  
      db.query(query, [ubs_id], (error, results) => {
        if (error) {
          recusado({ error: 'Ocorreu um erro ao buscar as áreas.', details: error });
          return;
        }
  
        aceito(results);
      });
    });
  }
  
}
