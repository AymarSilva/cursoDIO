import React, { useEffect, useState } from 'react';
import Pokemon from './services/classPokemons';
import './App.css'

const FetchPokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(4);

    async function verMais() {
        setLimit(prevLimit => {
            const newLimit = prevLimit+3;
            return newLimit;
        });
    };

    async function fetchPokemons() {
        try {
            const resposta = await fetch(`http://localhost:5000/pokemons/${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                return setError(`Resposta diferente de ok: ${await resposta.text()}`);
            };

            const data = await resposta.json();
            setPokemons(prevPoke => {
                const pokemonsFiltrados = data.map(poke => {
                    let nome = poke.name;
                    nome = nome.substring(0,1).toUpperCase() + nome.substring(1,nome.length);

                    const numero = poke.id;
                    const moves = poke.moves.slice(0, 3).map(move => move.move.name);

                    const spriteFront = poke.sprites.front_default;

                    const tipos = poke.types.map(tipo => tipo.type.name);

                    return new Pokemon(
                        nome,
                        tipos,
                        moves,
                        numero,
                        spriteFront
                    );
                });

                return pokemonsFiltrados;
            });

        } catch (error) {
            return setError(`Erro ao fetch Pokémon: ${error}`);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, [limit]);

    return (
        <div>
            {error && <p>{error}</p>}
            {
                pokemons.map((pokemon, index) => (
                    <div key={index} className={`${pokemon.tipos[0]} card mb-3 float-lg d-block mx-auto justify-content-between`} style={{ maxWidth: "540px" }}>
                        <div className="row g-0">
                            <div className="col-md-4 d-flex flex-column justify-content-around align-items-center">
                                <div>
                                    <p style={{ margin: '0' }}>{'#' + pokemon.numero}</p>
                                    <h5 className="modal-title fs-5">{pokemon.nome}</h5>
                                </div>
                                <img src={pokemon.foto} className="img-fluid" alt={pokemon.nome} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6>Type</h6>
                                        <ol className='list-group'>
                                            {pokemon.tipos.map((tipo, index) => (
                                                <li style={{ color: 'white', filter: 'brightness(1.2)' }} className={`${tipo} list-group-item`} key={index}>{tipo}</li>
                                            ))}
                                        </ol>
                                        <h6>Movements</h6>
                                        <ol className="card-text list-group">
                                            {pokemon.moves.map((move, index) => (
                                                <li style={{ color: 'white', filter: 'brightness(0.90)' }} key={index} className={`${pokemon.tipos[0]} list-group-item`}>{move}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            <button onClick={() => verMais()} className='d-block mx-auto btn btn-warning' type="button">Ver Mais</button>
        </div>
    );
}

export default FetchPokemons;
