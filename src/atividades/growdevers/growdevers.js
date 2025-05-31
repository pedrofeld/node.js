import express from 'express';
import * as dotenv from 'dotenv';
import { growdevers } from './dados.js';
import { randomUUID } from 'crypto'; 
import { logMiddleware, logRequestMiddleware, logBloquearAtualizacaoGrowNaoMatriculadoMiddleware } from './middleware.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(
    //{
        // origin: "https://growdev.com.br",
        // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        // allowedHeaders: ["Content-Type", "Authorization"]
    //}
));

app.get("/growdevers", [logMiddleware, logRequestMiddleware], (req, res) => {
    try {
        const { idade, nome, email, email_includes } = req.query;

        let dados = growdevers;

        if (idade) {
            dados = dados.filter(g => g.idade >= Number(idade));
        }

        if (nome) {
            dados = dados.filter(g => g.nome.toLowerCase().includes(nome.toLowerCase()));
        }

        if (email) {
            dados = dados.filter(g => g.email.toLowerCase === email.toLowerCase());
        }

        if (email_includes) {
            dados = dados.filter(g => g.email.toLowerCase().includes(email_includes.toLowerCase()));
        }

        res.status(200).send({
            ok: true,
            mensagem: "Growdevers listados com sucesso",
            dados
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            mensagem: "Erro ao cadastrar Growdever",
            erro: error.message
        });
    }
});

app.post("/growdevers", [logRequestMiddleware], (req, res) => {
    try {
        // 1 etapa: entrada
        const body = req.body;

        if(!body.nome || !body.email || !body.idade || !body.matriculado) {
            return res.status(400).send({
                ok: false,
                mensagem: "Todos os campos são obrigatórios"
            });
        }

        if(Number(body.idade) <18) {
            return res.status(400).send({
                ok: false,
                mensagem: "Idade mínima é 18 anos"
            });
        }

        const novoGrowdever = {
            id: randomUUID(),
            nome: body.nome,
            email: body.email,
            idade: body.idade,
            matriculado: body.matriculado
        };

        // 2 etapa: processamento
        growdevers.push(novoGrowdever);
        
        // 3 etapa: saída
        res.status(201).send({
            ok: true,
            mensagem: "Growdever cadastrado com sucesso",
            dados: novoGrowdever
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            mensagem: "Erro ao cadastrar Growdever",
            erro: error.message
        });
    }
});

app.get("/growdevers/:id", (req, res) => {
    // 1 etapa: entrada
    const id = req.params.id;

    // 2 etapa: processamento
    const growdever = growdevers.find(g => g.id === id);

    if (!growdever) {
        return res.status(404).send({
            ok: false,
            mensagem: "Growdever não encontrado"
        });
    }

    // 3 etapa: saída
    res.status(200).send({
        ok: true,
        mensagem: "Growdever encontrado com sucesso",
        dados: growdever
    });
});

app.put("/growdevers/:id", [logBloquearAtualizacaoGrowNaoMatriculadoMiddleware], (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, idade, matriculado } = req.body;

        const growdever = growdevers.find(g => g.id === id);

        if (!growdever) {
            return res.status(404).send({
                ok: false,
                mensagem: "Growdever não encontrado"
            });
        }

        growdever.nome = nome;
        growdever.email = email;
        growdever.idade = idade;
        growdever.matriculado = matriculado;

        res.status(200).send({
            ok: true,
            mensagem: "Growdever atualizado com sucesso",
            dados: growdever
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            mensagem: "Erro ao cadastrar Growdever",
            erro: error.message
        });
    }
});

// toggle no campo de matriculado
app.patch("/growdevers/:id", [logBloquearAtualizacaoGrowNaoMatriculadoMiddleware], (req, res) => {
    try {
        const { id } = req.params;

        const growdever = growdevers.find(g => g.id === id);

        if (!growdever) {
            return res.status(404).send({
                ok: false,
                mensagem: "Growdever não encontrado"
            });
        }

        growdever.matriculado = !growdever.matriculado;

        res.status(200).send({
            ok: true,
            mensagem: "Growdever atualizado com sucesso",
            dados: growdever
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            mensagem: "Erro ao cadastrar Growdever",
            erro: error.message
        });
    }
})

app.delete("/growdevers/:id", (req, res) => {
    try {
        const { id } = req.params;

        const index = growdevers.findIndex(g => g.id === id);

        if (index < 0) {
            return res.status(404).send({
                ok: false,
                mensagem: "Growdever não encontrado"
            });
        }

        growdevers.splice(index, 1);

        res.status(200).send({
            ok: true,
            mensagem: "Growdever deletado com sucesso",
            dados: growdevers
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            mensagem: "Erro ao cadastrar Growdever",
            erro: error.message
        });
    }
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log('Server is running on port', porta);
});