import axios from "axios";

async function getPokemons(req, res) {
    let offset = 0; let limit = 3
  try {
    const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);

    if (resposta.status !== 200) {
        return (
            res.status(resposta.status)
            .send(`response diferente de 200: ${ resposta.status }`)
        )  
    };

    res.status(200).json(resposta.data);

  } catch (error) {
    console.error(`Erro na api: ${error}`);
    res.status(500).json(error);
  };
}

export default getPokemons;