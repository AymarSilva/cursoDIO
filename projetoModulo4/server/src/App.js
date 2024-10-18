import express from 'express';
import cors from 'cors';
import GetPokemons from './Controllers/PokemonsController.js';

const server = express();
const porta = 5000;

server.use(cors());
server.use(express.json());

server.get('/pokemons', GetPokemons);

server.listen(porta,console.log(`Listening on ${porta}`));