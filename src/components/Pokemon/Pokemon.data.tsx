import { useState, ChangeEvent } from "react";
import { usePokemons } from "src/hooks/api/usePokemons";
import { PokemonView } from "./Pokemon.view";

export function Pokemon() {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [pokemonId, setPokemonId] = useState(0);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

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
      search={search}
      handleChange={handleChange}
      setSearchValue={setSearchValue}
      setPokemonId={setPokemonId}
    />
  );
}
