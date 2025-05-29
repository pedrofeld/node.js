export const logMiddleware = (req, res, next) => {
    console.log("Hello middleware");

    next();
}

export const logRequestMiddleware = (req, res, next) => {
    console.log(req.query);
    console.log(req.hostname);
    console.log(req.ip);
    console.log(req.body);

    next();
}

export const logBloquearAtualizacaoGrowNaoMatriculadoMiddleware = (req, res, next) => {
    try {
        const { id, matriculado } = req.body;

        const growdevers = growdevers.find(g => g.id === id);

        if (!growdevers) {
            return res.status(404).send({
                ok: false,
                mensagem: "Growdever não encontrado"
            });
        }

        if (matriculado === false) {
            return res.status(400).send({
                ok: false,
                mensagem: "Growdevers não matriculados não podem ser atualizados"
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            mensagem: "Erro ao cadastrar Growdever",
            erro: error.message
        });
    }
}