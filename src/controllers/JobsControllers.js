const JobsServices = require('../services/JobsServices')

module.exports = {
    fetchAll: async (req, res) => {
        let json = { error: '', result: [] };

        let jobs = await JobsServices.fetchAll()

        for (let i in jobs) {
            json.result.push({
                id: jobs[i].id,
                name: jobs[i].name,
                linguagens: jobs[i].linguagens,
                regiao: jobs[i].regiao,
                tipo: jobs[i].tipo,
                descricao: jobs[i].descricao,
                salario: jobs[i].salario,
                link: jobs[i].link
            })
        }

        res.json(json)
    },

    fetchOne: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id
        let jobs = await JobsServices.fetchOne(id)

        if (jobs) {
            json.result = jobs;
            res.status(200)
        } else {
            json.error = 'Não foi encontrado o Id especificado.'
            res.status(404)
        }

        res.json(json)
    },

    insertJob: async (req, res) => {
        let json = { error: '', result: {} };

        let name = req.body.name;
        let linguagens = req.body.linguagens;
        let regiao = req.body.regiao;
        let tipo = req.body.tipo;
        let descricao = req.body.descricao;
        let salario = req.body.salario;
        let link = req.body.link;

        if (name && linguagens && regiao && tipo && descricao && salario && link) {
            let jobId = await JobsServices.insertJob(name, linguagens, regiao, tipo, descricao, salario, link);
            json.result = {
                id: jobId,
                name,
                linguagens,
                regiao,
                tipo,
                descricao,
                salario,
                link
            };
        } else {
            json.error = 'Campos incorretos, tente novamente.';
            res.status(500)
        }
        res.json(json);
    },

    editJob: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id;
        let name = req.body.name;
        let linguagens = req.body.linguagens;
        let regiao = req.body.regiao;
        let tipo = req.body.tipo;
        let descricao = req.body.descricao;
        let salario = req.body.salario;
        let link = req.body.link;

        if (id && name && linguagens && regiao && tipo && descricao && salario && link) {
            await JobsServices.alter(id, name, linguagens, regiao, tipo, descricao, salario, link);
            json.result = {
                id,
                name,
                linguagens,
                regiao,
                tipo,
                descricao,
                salario,
                link
            };
            res.status(200)
        } else {
            json.error = 'Campos incorretos, tente novamente.';
            res.status(500)
        }
        res.json(json);
    },

    deleteJob: async (req, res) => {
        let json = { error: '', result: {} };

        const result = await JobsServices.delete(req.params.id)

        if (result.affectedRows > 0) {
            json.result = 'Vaga deletada.'
            res.status(200)
        } else {
            json.error = 'Id inexistente, por favor tente outro.'
            res.status(404)
        }

        res.json(json)
    }

}