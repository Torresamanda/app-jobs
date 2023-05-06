const db = require('../db')

module.exports = {
    fetchAll: () => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM Jobs', (error, results) => {
                if (error) {
                    rejected(error);
                    return;
                }
                accepted(results);
            });
        });
    },

    fetchOne: (id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM Jobs WHERE id = ?', [id], (error, results) => {
                if (error) {
                    rejected(error)
                }

                if (results.length > 0) {
                    accepted(results[0])
                } else {
                    accepted(false)
                }
            })
        })
    },

    insertJob: (name, linguagens, regiao, tipo, descricao, salario, link) => {
        return new Promise((accepted, rejected) => {
            db.query('INSERT INTO Jobs (name, linguagens, regiao, tipo, descricao, salario, link) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, linguagens, regiao, tipo, descricao, salario, link],
                (error, results) => {
                    if (error) {
                        rejected(error)
                    };

                    accepted(results.jobId);
                });
        });
    },

    editJob: (id, name, linguagens, regiao, tipo, descricao, salario, link) => {
        return new Promise((accepted, rejected) => {
            db.query('UPDATE Jobs SET name = ?, linguagens = ?, regiao = ?, tipo = ?, descricao = ?, salario = ?, link = ? WHERE id = ?',
                [name, linguagens, regiao, tipo, descricao, salario, link, id],
                (error, results) => {
                    if (error) {
                        rejected(error);
                        return;
                    }
                    accepted(results)
                })
        })
    },

    deleteJob: (id) => {
        return new Promise((accepted, rejected) => {
            db.query('DELETE FROM Jobs WHERE id = ?',
            [id],
            (error, results) => {
                if(error) {
                    rejected(error);
                    return;
                }
                accepted(results);
            });
        });
    }

};