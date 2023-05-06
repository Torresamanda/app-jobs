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
        }

        res.json(json)
    },

    insert: async (req, res) => {
        let json = { error: '', result: {} };

        let name = req.body.name;
        let linguagens = req.body.linguagens;
        let regiao = req.body.regiao;
        let tipo = req.body.tipo;
        let descricao = req.body.descricao;
        let salario = req.body.salario;
        let link = req.body.link;

        if (name && linguagens && regiao && tipo && descricao && salario && link) {
            let jobId = await JobsServices.insert(name, linguagens, regiao, tipo, descricao, salario, link);
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
            json.error = `Campos não enviados.`;
        }
        res.json(json);
    },

    alter: async(req, res) => {
        let json = {error:'', result:{}};

        let id = req.params.id;
        let name = req.body.name;
        let linguagens = req.body.linguagens;
        let regiao = req.body.regiao;
        let tipo = req.body.tipo;
        let descricao = req.body.descricao;
        let salario = req.body.salario;
        let link = req.body.link;

        if (id && name && linguagens && regiao && tipo && descricao && salario && link){
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
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    delete: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id

        if(id) {
            await JobsServices.delete(id);
            json.result = `Id: ${id} deletado`
        } else {
            json.error = 'Não foi possível deletar. Tente novamente.'
        }
        
        res.json(json)
    }

}