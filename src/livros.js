import axios from 'axios';

const api = axios.create({
    baseURL: "https://books-api-j138.onrender.com"
})

async function listarLivros() {
    try {
        const result = await api.get("/books");
        const lista = result.data.data.map(item => {
            return {
                id: item.id,
                title: item.title
            }
        })
        console.log(lista);
    } catch (error) {
        console.error("Erro ao listar livros:", error);
    }
}

listarLivros();