import axios from 'axios';

const api = axios.create({
    baseURL: "https://books-api-j138.onrender.com"
})

async function listarLivros() {
    try {
        const result = await api.get("/books");
        return console.log(result.data);
    } catch (error) {
        console.error("Erro ao listar livros:", error);
    }
}

listarLivros();