import React from "react";
import Card from "./Card";
import {useState} from "react"
import Header from "./Header";

export default function Body() {

    let [pokemonCardData, setPokemonCardData] = useState(fetchPokemonData)
    const [pending, setPending] = useState(false)

    const [scores, setScores] = useState([])
    const [cardIDs, setCardIDs] = useState([])
    const [currentScore, setCurrentScore] = useState(0)
    let pokeIndex = 0;

    async function fetchPokemonData() {


        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
            const data = await response.json();
          
            const pokemonResults = data.results;
          
            const randomIndices = [];
            while (randomIndices.length < 16) {
              const randomIndex = Math.floor(Math.random() * pokemonResults.length);
              if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
              }
            }
          
            const pokemonData = randomIndices.map(async (index) => {
              const pokemon = pokemonResults[index];
              const pokeResponse = await fetch(pokemon.url);
              const formattedPokeResponse = await pokeResponse.json();
              const spriteUrl = formattedPokeResponse.sprites.front_default;
              return { name: pokemon.name, src: spriteUrl, id: index + 1 };
            });
          
            const resolvedPokemonData = await Promise.all(pokemonData);
            setPending(true);
            setPokemonCardData(resolvedPokemonData);
          } catch (error) {
            console.log(error);
          }
    }

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    function findMax(array) {
        let max = 0

        for (let i = 0; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i]
            }
        }

        return max
    }

    function restartGame() {
        setPokemonCardData(shuffleArray(pokemonCardData))
        setCurrentScore(0)
        setCardIDs([])
        setScores([])
    }

    function handleClick(id) {
        setPokemonCardData(shuffleArray(pokemonCardData))

        if (cardIDs.includes(id)) {
            console.log("lost")
            setScores(prevScores => [...prevScores, currentScore])
            setCurrentScore(0)
            setCardIDs([])            
        } else {
            setCurrentScore(prevScore => prevScore + 1)
            setCardIDs(prevIDs => [...prevIDs, id])
        }

        console.log(findMax([5,10,20]))
        console.log(scores)
    }

    return (
        <>
            <Header currentScore={currentScore} highScore={findMax([...scores, 0])} restart={restartGame}/>

            <div className="body--container">
                {pending ? pokemonCardData.map(pokemon => {
                    return (
                        <Card 
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name}
                            src={pokemon.src}
                            click={handleClick}
                        />
                    )
                }) : <h1 className="loading font--title">Loading your data . . .</h1>}
            </div>
        </>
    )
}