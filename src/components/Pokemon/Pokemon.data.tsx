import { useState } from "react";
import { usePokemons } from "src/hooks/api/usePokemons";
import { PokemonView } from "./Pokemon.view";

export function Pokemon() {
  const [searchValue, setSearchValue] = useState("");
  const [pokemonId, setPokemonId] = useState(0);

  const {
    data: Pokemon,
    isLoading,
    error,
  } = usePokemons(searchValue, pokemonId);

  return (
    <PokemonView
      Pokemon={Pokemon}
      loading={isLoading}
      errorMessage={error?.message}
      setSearchValue={setSearchValue}
      setPokemonId={setPokemonId}
    />
  );
}
