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

async function buscarLivroPorId(id) {
    try {
        const result = await api.get(`/books/${id}`);
        console.log(result.data);
    } catch (error) {
        console.error(`Erro ao buscar livro com ID ${id}:`, error);
    }
}

async function criarLivro(livro) {
    try {
        const result = await api.post("/books", livro);
        console.log("Livro criado:", result.data.data);
    } catch (error) {
        console.error("Erro ao criar livro:", error);
    }
}

listarLivros();
buscarLivroPorId("b1044037-70e4-42cf-9d9d-a8f80a1484b4");
criarLivro({
    title: "Novo Livro",
    resume: "Esse é um resumo teste do livro teste",
    totalPages: 150,
    isFavorite: false, 
    authorId: "a9715015-5d16-4e0b-a27d-8895ff183e3b"
}
)