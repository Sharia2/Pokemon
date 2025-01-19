import { useEffect, useState } from "react";
import "./pokemones.css"


function Pokemones() {
    const [listPokemons, setListPokemons] = useState<Array<any>>([])
    const [response, setResponse] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false);

    const getAllPokemons = async (url: string) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        };

        setLoading(true);
        const response:any =  await fetch(url,requestOptions);
        const result  = await response.json()
        console.log(result, "result")
        setResponse(result);

        const finalList = await Promise.all(result.results.map(async (pokemon:any) => {
            const imageRequest:any = await fetch(pokemon.url, requestOptions);
            const finalImage = await imageRequest.json()
            return {
                name: pokemon.name,
                img: finalImage.sprites.front_default,
            }
        }));

        setListPokemons(finalList);
        setLoading(false);

        return finalList
    }

    useEffect(() => {getAllPokemons("https://pokeapi.co/api/v2/pokemon")}, [])


     return (
        <>
        <div className="pokemones-container">
            {listPokemons.map((pok) => {
                   return <div className="pokemon-item">
                       <p>{pok.name}</p>
                       <img src={pok.img}></img>
                   </div>
                })}
        </div>
        <div className="buttons-continer">
            <button disabled={loading || !response?.previous} onClick={() => getAllPokemons(response?.previous)}>PREVIOUS</button>
            <button disabled={loading || !response?.next} onClick={() => getAllPokemons(response?.next)}>NEXT</button>
        </div>
        </>
     )
}

export default Pokemones;