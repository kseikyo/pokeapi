import { useQuery } from "react-query";
import { Pokemon } from "src/types/pokemon";

export const usePokemons = (searchValue: string, pokemonId: number) => {
  const result = useQuery<Pokemon, Error>(
    ["pokemons", searchValue, pokemonId],
    async () => {
      let search: number | string = pokemonId ? pokemonId : searchValue;
      if (!searchValue) {
        throw new Error("Please enter a pokemon name.");
      }
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${search}`
        );
        if (response.status >= 400) {
          throw new Error("No pokemon found");
        }
        const data = await response.json();
        // console.log(data);
        const { name, id, sprites } = data;
        return { name, id, sprites };
      } catch (err) {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=10000"
        );
        const data = await response.json();
        const arr = data.results.filter(
          (pokemon: { name: string; url: string }) =>
            pokemon.name.includes(searchValue)
        );
        if (!arr.length) {
          return await Promise.reject(err);
        }
        // here I could've implemented to show the list of pokemons, but for simplicity sake
        // just fetch the first one in the list and show it
        const pokemon = await fetch(arr[0].url);
        const { name, id, sprites } = await pokemon.json();
        return { name, id, sprites };
      }
    },
    {
      retry: false,
      enabled: Boolean(searchValue) && pokemonId >= 0,
      refetchOnWindowFocus: false,
    }
  );
  return result;
};
