import Pagination from "./Pagination.js";

document.addEventListener("DOMContentLoaded", async () => {
    const pokemonListContainerElement = document.querySelector(".pokemon-list");
    const pokemonListElement = document.querySelector(".pokemon-list__elements");
    const getNextPokemonsButtonElement = document.querySelector(".load-more");
    const searchInputElement = document.querySelector(".search__input");
    const pokemonApi = new Pagination();
    
    /**
     * @return Promise<void>
     */
    const fetchNextPokemons = async () => {
        const pokemons = await pokemonApi.nextPage();
        for (const pokemon of pokemons) {
            renderPokemon(pokemon);
        }
    }
    
    /**
     * @param name
     * @param sprites
     */
    const renderPokemon = ({name, sprites}) => {
        const pokemonContainer = document.createElement("li");
        
        const pokemonImage = document.createElement("img");
        pokemonImage.src = sprites.front_default;
        pokemonContainer.appendChild(pokemonImage);
        
        const pokemonName = document.createElement("span");
        pokemonName.innerText = name;
        pokemonContainer.appendChild(pokemonName);
        
        pokemonListElement.appendChild(pokemonContainer);
    }
    
    getNextPokemonsButtonElement.addEventListener("click", async (event) => {
        event.target.disabled = true;
        event.target.classList.add("button--isLoading")
        await fetchNextPokemons()
        searchInputElement.dispatchEvent(new Event("input"));
        event.target.classList.remove("button--isLoading")
        event.target.disabled = false;
    });
    
    searchInputElement.addEventListener("input", (event) => {
        const pokemons = pokemonApi.getItems().filter((pokemon) => pokemon.name.toLowerCase().includes(event.target.value));
        pokemonListElement.replaceChildren();
        
        if (pokemons.length > 0) {
            pokemonListContainerElement.classList.remove("no-result");
            for (const pokemon of pokemons) {
                renderPokemon(pokemon);
            }
        } else {
            pokemonListContainerElement.classList.add("no-result");
        }
        
    })
    
    await fetchNextPokemons();
});
