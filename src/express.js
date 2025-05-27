import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const porta = process.env.PORT;

app.listen(porta, () => {
    console.log('Server is running on port', porta);
});