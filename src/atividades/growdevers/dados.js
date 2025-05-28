import { randomUUID } from 'crypto'; 
// desvantagem do randomUUID: quando o servidor reinicia, os IDs mudam
// vantagem: não precisa de banco de dados para gerar IDs únicos

export const growdevers = [
    {
        id: randomUUID(),
        nome: "Pedro",
        email: "pedro.gael.feld@gmail.com",
        idade: 20,
        matriculado: true
    },
    {
        id: randomUUID(),
        nome: "Gabrielle",
        email: "gabriellefeld@gmail.com",
        idade: 20,
        matriculado: true
    }
];