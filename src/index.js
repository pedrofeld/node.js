console.log('Hello, world! This is a test script.');

import odd from 'odd';
import axios from 'axios';

const oddNumbers = odd([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log('Odd numbers from 1 to 10: ' + oddNumbers)

axios
    .get("https://rickandmortyapi.com/api/character")
    .then((result) => {
        console.log(result.data.results.map((character) => character.name).join(', '));
        console.log('Total characters: ' + result.data.info.count);
    })
    .catch((error) => {
        console.error(error);
    });