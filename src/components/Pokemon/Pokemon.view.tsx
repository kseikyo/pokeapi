import { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react";
import cn from "classnames";
import { Pokemon } from "src/types/pokemon";

type PokemonView = {
  Pokemon?: Pokemon;
  loading?: boolean;
  errorMessage?: string | null;
  search: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setPokemonId: Dispatch<SetStateAction<number>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function PokemonView({
  Pokemon,
  loading,
  errorMessage,
  search,
  setPokemonId,
  handleChange,
  setSearchValue,
}: PokemonView) {
  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPokemonId(0);
    setSearchValue(search);
  };
  return (
    <div className="flex w-full text-xl justify-center flex-col gap-8">
      <h1>Search for a Pokemon!</h1>
      <form onSubmit={handleSumit} className="">
        <div className="w-full flex flex-row">
          <label htmlFor="pokemon-search" className="sr-only">
            Type a name or ID for a pokemon
          </label>
          <input
            id="pokemon-search"
            className={cn(
              "block w-full pr-10 sm:text-sm rounded-md border-r-0 rounded-r-none",
              {
                "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500":
                  errorMessage,
              }
            )}
            type="text"
            placeholder="Search a pokemon by name or ID"
            value={search}
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-l-none",
              {
                "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500":
                  errorMessage,
                "border-gray-500": !errorMessage,
              }
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center ">
                <div className="w-4 h-4 border-b-2 border-r-2 border-gray-900 rounded-full animate-spin"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Search"
            )}
          </button>
        </div>
        {errorMessage && (
          <p
            className="mt-1 ml-1 text-left text-sm text-red-600"
            id="search-error"
          >
            {errorMessage}
          </p>
        )}
      </form>
      {errorMessage ? (
        <Fragment>
          <div
            className="grow border border-solid border-red-300 rounded bg-red-100 p-4 text-center text-red-500"
            role="error-message"
          >
            {errorMessage}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className={cn("flex items-center justify-center")}>
            <div
              className={cn("", {
                "animate-pulse bg-gray-300 rounded-md p-4 py-6 w-36 h-44 border border-gray-300":
                  loading,
                hidden: !loading,
              })}
              role="display-loading"
            ></div>
            {Pokemon && (
              <div>
                <div className="border border-gray-300 p-4 rounded-md bg-gray-100 text-gray-700 text-sm text-center">
                  <span className="capitalize" role="display-pokemon-name">
                    Name: {Pokemon.name}
                  </span>
                  <span className="block" role="display-pokemon-id">ID: {Pokemon.id}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={Pokemon.sprites.front_default}
                    alt={Pokemon.name}
                    className="w-full"
                  />
                </div>
                <div className="w-full flex gap-2 px-2 mt-3">
                  <button
                    disabled={Pokemon.id - 1 === 0}
                    onClick={() => {
                      setPokemonId(Pokemon.id - 1);
                    }}
                    className="inline-flex items-center px-4 py-2 border-gray-500 border shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <button
                    // unfortunately there's no API call to get the last id, so I just hardcoded
                    disabled={Pokemon.id === 10249}
                    onClick={() => {
                      setPokemonId(Pokemon.id + 1);
                    }}
                    className="inline-flex items-center px-4 py-2 border-gray-500 border shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}
