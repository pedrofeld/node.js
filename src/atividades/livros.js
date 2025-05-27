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
        console.log("-----------------------");
        console.log(lista);
        console.log("-----------------------");
    } catch (error) {
        console.error("Erro ao listar livros:", error);
    }
}

async function buscarLivroPorId(id) {
    try {
        const result = await api.get(`/books/${id}`);
        console.log("-----------------------");
        console.log(result.data);
        console.log("-----------------------");
    } catch (error) {
        console.error(`Erro ao buscar livro com ID ${id}:`, error);
    }
}

async function criarLivro(livro) {
    try {
        const result = await api.post("/books", livro);
        console.log("------------------------");
        console.log("Livro criado:", result.data.data);
        console.log("------------------------");
    } catch (error) {
        console.error("Erro ao criar livro:", error);
    }
}

async function atualizarLivro(id, livro) {
    try {
        const result = await api.put(`/books/${id}`, livro);
        console.log("------------------------");
        console.log("Livro atualizado:", result.data);
        console.log("Resultado; " + result.status)
        console.log("------------------------");
    } catch (error) {
        console.error(`Erro ao atualizar livro com ID ${id}:`, error);
    }
}

async function excluirLivro(id) {
    try {
        const result = await api.delete(`/books/${id}`);
        console.log("------------------------");
        console.log("Livro excluído:", result.data);
        console.log("Resultado: " + result.status);
        console.log("------------------------");
    } catch (error) {
        console.error(`Erro ao excluir livro com ID ${id}:`, error);
    }
}

listarLivros();
// buscarLivroPorId("5b046734-de36-43cb-9e96-6b09f1e38426");
// criarLivro({
//     title: "Novo Livro",
//     resume: "Esse é um resumo teste do livro teste",
//     totalPages: 150,
//     isFavorite: false, 
//     authorId: "a9715015-5d16-4e0b-a27d-8895ff183e3b"
// }
// )
// atualizarLivro("5b046734-de36-43cb-9e96-6b09f1e38426", {
//     title: "Livro Atualizado",
//     resume: "Esse é um resumo atualizado do livro teste",
//     totalPages: 200,
//     isFavorite: true, 
//     authorId: "a9715015-5d16-4e0b-a27d-8895ff183e3b"
// });
// excluirLivro("eaa4198e-10d4-47c6-b0fc-7895e29d7903")