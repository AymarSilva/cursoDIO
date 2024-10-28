import axios from "axios";

async function getPokemons(req, res) {
  let offset = 0;
  let limit = req.params.limit;
  try {
    const resposta = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );

    if (resposta.status !== 200) {
      return res
        .status(resposta.status)
        .send(`response diferente de 200: ${resposta.status}`);
    }
    const pokemons = await getPokemonDetails(resposta.data.results);
    console.log(pokemons);
    return res.status(200).json(pokemons);

  } catch (error) {
    console.error(`Erro na api: ${error}`);
    res.status(500).json(error);
  }
}

async function getPokemonDetails(data) {
  let pokesDesc = [];
  

  const promises = data.map(async (dado) => {
    // const pokeNome = dado.name;
    const pokeAtributos = await axios.get(dado.url);
    const pokemon = pokeAtributos.data;
    return pokemon;
  });
  pokesDesc = await Promise.all(promises);
  return pokesDesc;
}

export default getPokemons;
