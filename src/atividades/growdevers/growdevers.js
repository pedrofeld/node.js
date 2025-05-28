import express from 'express';
import * as dotenv from 'dotenv';
import { growdevers } from './dados.js';
import { randomUUID } from 'crypto'; 

dotenv.config();

const app = express();
app.use(express.json());

app.get("/growdevers", (req, res) => {
    res.status(200).send({
        ok: true,
        mensagem: "Growdevers listados com sucesso",
        dados: growdevers
    });
});

app.post("/growdevers", (req, res) => {
    // 1 etapa: entrada
    const body = req.body;
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
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log('Server is running on port', porta);
});