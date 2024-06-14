const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, recusado) => {
            db.query('SELECT * FROM paciente', (error, results) => {
                if (error) {
                    recusado(error);
                    return;
                }
                aceito(results);
            });
        });
    },

    buscarUm: (paci_id) => {
        return new Promise((aceito, recusado) => {
            db.query('SELECT * FROM paciente WHERE paci_id = ?', [paci_id], (error, results) => {
                if (error) {
                    recusado(error);
                    return;
                }
                aceito(results[0]);
            });
        });
    },

    inserir: (paci_nome, paci_data_nascimento, paci_CPF, paci_cel, paci_email, paci_endereco, paci_senha) => {
        return new Promise((aceito, recusado) => {
            db.query(
                'INSERT INTO paciente (paci_nome, paci_data_nascimento, paci_CPF, paci_cel, paci_email, paci_endereco, paci_senha) VALUES (?,?,?,?,?,?,?)',
                [paci_nome, paci_data_nascimento, paci_CPF, paci_cel, paci_email, paci_endereco, paci_senha],
                (error, results) => {
                    if (error) {
                        recusado(error);
                        return;
                    }
                    aceito(results.insertId);
                }
            );
        });
    },

    alterarDadosPaciente: (paci_id, dados) => {
        return new Promise((aceito, recusado) => {
            const fieldsToUpdate = [];
            const valuesToUpdate = [];

            Object.keys(dados).forEach(key => {
                if (dados[key] !== undefined) {
                    fieldsToUpdate.push(`${key} = ?`);
                    valuesToUpdate.push(dados[key]);
                }
            });

            valuesToUpdate.push(paci_id);

            db.query(
                `UPDATE paciente SET ${fieldsToUpdate.join(', ')} WHERE paci_id = ?`,
                valuesToUpdate,
                (error, results) => {
                    if (error) {
                        console.error('Erro ao executar consulta de alteração de dados do paciente:', error);
                        recusado(error);
                        return;
                    }
                    console.log('Dados do paciente alterados com sucesso:', results);
                    aceito(results);
                }
            );
        });
    },

    excluir: (paci_id) => {
        return new Promise((aceito, recusado) => {
            db.query('DELETE FROM paciente WHERE paci_id = ?', [paci_id], (error, results) => {
                if (error) {
                    recusado(error);
                    return;
                }
                aceito(results);
            });
        });
    },

    verificarLogin: (paci_email, paci_senha) => {
        return new Promise((aceito, recusado) => {
            db.query(
                'SELECT * FROM paciente WHERE paci_email = ? AND paci_senha = ?',
                [paci_email, paci_senha],
                (error, results) => {
                    if (error) {
                        recusado({ error: 'Erro ao verificar o login do paciente.', details: error });
                        return;
                    }

                    if (results.length > 0) {
                        aceito(true);
                    } else {
                        aceito(false);
                    }
                }
            );
        });
    },
};
