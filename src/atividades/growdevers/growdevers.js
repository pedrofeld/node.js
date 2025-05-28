import express from 'express';
import * as dotenv from 'dotenv';
import { growdevers } from './dados.js';

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

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log('Server is running on port', porta);
});