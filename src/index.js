console.log('Hello, world! This is a test script.');

import odd from 'odd';
import axios from 'axios';

const oddNumbers = odd([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log('Odd numbers from 1 to 10: ' + oddNumbers);

// Função que simula atraso
async function listarRickAndMorty() {
    try {
        console.log('Iniciando a função assíncrona com delay...');
        // Espera 5 segundos antes de fazer a requisição
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const result = await axios.get("https://rickandmortyapi.com/api/character");
        console.log('Dados após atraso (listarRickAndMorty):');
        console.log(result.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Chama a função assíncrona (inicia, mas continua execução do resto do código)
listarRickAndMorty();

// Essa parte roda imediatamente, sem esperar a anterior
axios
    .get("https://rickandmortyapi.com/api/character")
    .then((result) => {
        console.log('Nomes dos personagens (requisição direta):');
        console.log(result.data.results.map((character) => character.name).join(', '));
        console.log('Total de personagens: ' + result.data.info.count);
    })
    .catch((error) => {
        console.error(error);
    });