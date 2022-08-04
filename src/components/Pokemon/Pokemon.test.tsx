import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { Pokemon } from "./Pokemon.data";
import { server } from "../../msw/mswServer";
import {
  pokemonHandler,
  pokemonHandlerException,
} from "src/msw/handlers/pokemonMock";

const MOCK_POKEMON = {
  name: "pikachu",
  id: 25,
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
};

const MOCK_POKEMON_NEXT = {
  name: "raichu",
  id: 26,
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
  },
};

const MOCK_MESSAGE_ERROR = "No pokemon found";

describe("Pokemon", () => {
  afterEach(() => server?.resetHandlers());

  describe("positive flow", () => {
    it("should show a loading state when the API is still fetching", async () => {
      const user = userEvent.setup();
      server.use(pokemonHandler);
      render(
        <QueryClientProvider client={new QueryClient()}>
          <Pokemon />
        </QueryClientProvider>
      );

      expect(await screen.findByText("Search")).toBeVisible();
      const input = screen.getByPlaceholderText(
        "Search a pokemon by name or ID"
      );
      const element = input as HTMLInputElement;
      fireEvent.change(element, { target: { value: "pikachu" } });

      expect(element.value).toBe("pikachu");
      const button = screen.getByText("Search") as HTMLButtonElement;
      await user.click(button);

      const displayMessage = screen.getByRole("display-loading");
      await waitFor(() => {
        expect(displayMessage).toHaveClass(
          "animate-pulse bg-gray-300 rounded-md p-4 py-6 w-36 h-44 border border-gray-300"
        );
      });
    });

    it("should see the data after the data loads with a search", async () => {
      const user = userEvent.setup();
      server.use(pokemonHandler);
      render(
        <QueryClientProvider client={new QueryClient()}>
          <Pokemon />
        </QueryClientProvider>
      );

      expect(await screen.findByText("Search")).toBeVisible();
      const input = screen.getByPlaceholderText(
        "Search a pokemon by name or ID"
      );
      const element = input as HTMLInputElement;
      fireEvent.change(element, { target: { value: "pikachu" } });
      // can't get userEvent to work with the inputs, not sure why but it's typing multiple repeated characters
      // await userEvent.click(element);
      // await userEvent.keyboard("pikachu");

      await waitFor(() => {
        expect(element.value).toBe("pikachu");
      });
      const button = screen.getByText("Search") as HTMLButtonElement;
      await user.click(button);

      await waitFor(
        async () => {
          expect(
            await screen.findByText(`Name: ${MOCK_POKEMON.name}`)
          ).toBeVisible();
        },
        { timeout: 2000 }
      );
      const displayName = screen.getByRole("display-pokemon-name");
      expect(displayName).toHaveTextContent(`Name: ${MOCK_POKEMON.name}`);
      const displayID = screen.getByRole("display-pokemon-id");
      expect(displayID).toHaveTextContent(`ID: ${MOCK_POKEMON.id}`);
    });

    it("should see the new data after the clicking the Next btn", async () => {
      const user = userEvent.setup();
      server.use(pokemonHandler);
      render(
        <QueryClientProvider client={new QueryClient()}>
          <Pokemon />
        </QueryClientProvider>
      );

      expect(await screen.findByText("Search")).toBeVisible();
      const input = screen.getByPlaceholderText(
        "Search a pokemon by name or ID"
      );
      const element = input as HTMLInputElement;
      fireEvent.change(element, { target: { value: "pikachu" } });

      await waitFor(() => {
        expect(element.value).toBe("pikachu");
      });
      const button = screen.getByText("Search") as HTMLButtonElement;
      await user.click(button);

      await waitFor(
        async () => {
          expect(
            await screen.findByText(`Name: ${MOCK_POKEMON.name}`)
          ).toBeVisible();
        },
        { timeout: 2000 }
      );
      const nextButton = screen.getByText("Next") as HTMLButtonElement;
      await user.click(nextButton);

      await waitFor(
        async () => {
          expect(
            await screen.findByText(`Name: ${MOCK_POKEMON_NEXT.name}`)
          ).toBeVisible();
        },
        { timeout: 2000 }
      );

      const displayName = screen.getByRole("display-pokemon-name");
      expect(displayName).toHaveTextContent(`Name: ${MOCK_POKEMON_NEXT.name}`);
      const displayID = screen.getByRole("display-pokemon-id");
      expect(displayID).toHaveTextContent(`ID: ${MOCK_POKEMON_NEXT.id}`);
    });
  });

  describe("negative flow", () => {
    it("should show an error message if the API call response contains a message in the body.", async () => {
      const user = userEvent.setup();
      server.use(pokemonHandlerException);
      render(
        <QueryClientProvider client={new QueryClient()}>
          <Pokemon />
        </QueryClientProvider>
      );
      expect(await screen.findByText("Search")).toBeVisible();
      const input = screen.getByPlaceholderText(
        "Search a pokemon by name or ID"
      );
      const element = input as HTMLInputElement;
      fireEvent.change(element, {
        target: { value: "this-should-not-find-anything" },
      });
      expect(element.value).toBe("this-should-not-find-anything");
      const button = screen.getByText("Search") as HTMLButtonElement;
      user.click(button);
      await waitFor(
        () => {
          const errorMessage = screen.getByRole("error-message");
          expect(errorMessage).toHaveTextContent(MOCK_MESSAGE_ERROR);
        },
        { timeout: 3500 }
      );
    });
  });
});
