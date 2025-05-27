/* 
Consumir API de CEP para obter informações de um endereço especíico
Mostrar dados do endereço no console
*/

import axios from 'axios';

// axios
//     .get("https://viacep.com.br/ws/93806054/json/")
//     .then(result => {
//         console.log(result.data);
//     })
//     .catch(error => {
//         console.error("Erro ao buscar CEP:", error);
//     });

async function buscarCep(cep) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        console.log(response.data);
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
    }
}

buscarCep("93806054");