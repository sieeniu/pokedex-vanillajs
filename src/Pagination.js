export default class Pagination {
    #items = [];
    #nextPage = "https://pokeapi.co/api/v2/pokemon/";
    #previousPage = null;
    
    /**
     * @return Promise<Array>
     */
    async nextPage() {
        try {
            const response = await fetch(this.#nextPage);
            const {next, results, previous} = await response.json();
            
            if (next) {
                this.#nextPage = next;
            }
            
            if (previous) {
                this.#previousPage = previous;
            }
            
            const pageElements = [];
            
            for (const result of results) {
                const pokemonDataResponse = await fetch(result.url);
                const pokemonData = await pokemonDataResponse.json();
                pageElements.push(pokemonData);
            }
            
            this.#items.push(...pageElements);
            return pageElements;
        } catch (err) {
            console.error(err);
        }
    }
    
    /**
     * @return Array
     */
    getItems() {
        return this.#items;
    }
}