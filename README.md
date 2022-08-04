# PokeApi code challenge

## Overview

### Tech Stack

- [Next.js v12.x](https://nextjs.org)
- [React v17.x](https://reactjs.org)
- [React Query v3.x](https://react-query.tanstack.com/)
- [Tailwind CSS v3.x](https://tailwindcss.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [Typescript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [Mock Service Worker](https://mswjs.io/) - Mock REST / GraphQL API
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting


## Commands

- `yarn` - Install dependencies. 
- `yarn dev` - Starts the development server.
- `yarn test` - Runs the unit tests.
- `yarn storybook` - Starts the Storybook UI.
- `yarn lint` - Runs ESLint on the project.
- `yarn prettier` - Formats code for the entire project

## Organization / Architecture

The components are co-located with the tests and stories. The implementation is done with things like mocks, styles, and data fetching components that are modeled after an MVC type architecture. Using this structure makes it easy to find all the code and functionality related to a specific component. This pattern follows the single responsibility principle since each file has one purpose. For example the `.data.tsx` Components handle data all the functionality related to data fetching for your component like network requests, pending states, and marshalling into a consumable format for your `.view.tsx` file that is responsible for just the UI representation of that data.

### Example directory

```
- UserRepos.test.tsx - Unit tests for the UserRepos component
- UserRepos.stories.tsx - Storybook UI for the UserRepos component
- UserRepos.query.tsx - GraphQL query for the UserRepos component
- UserRepos.data.tsx - Data fetching component for the UserRepos component
- UserRepos.view.tsx - View component for the UserRepos component
```

### Mock Service Worker (MSW)

Mock Service Worker makes it easy to write tests or stories for Components or files that depend on network requests. It allows you to mock responses for any requests that you test depends on and when your tests are running it will intercept network requests and return the mock data you provided.

## The Challenge

### Tasks
- [x] Have a web page that allows a user to enter a pokemon name;
- [x] When submitting, query https://pokeapi.co and display the given
pokemon (at least name, number and sprite), or an error message if no
match is found;
- [x] Provide “Previous” & “Next” buttons, that switch to the previous/next
pokemons, base on their id number;
- [x] Provide a text-based search feature, where inputting a name or partial
name should look for a matching pokemon and show it
- [x] Have at least two automated tests, for the two features above.

### Technical decisions

Given the time used to create this project, the search feature implemented fetches all pokemons (the request gets cached),
then filters in the frontend, since there's no filtering option to the API, gets the first element in the search, fetches the pokemon data,
and show it in the screen. This could be improved if needed to show all the options in the filter so the user could select a pokemon and go
into a detailed page.

The componetization could also be improved, since all the UI could be reused if required to add new features and continue to work on this project.
Since that's not the case, all the UI elements are rendered inside one component without being extracted to its own components.

The use of TailwindCSS is intentional and by my understanding of the requirements it fulfils the role of styling without a framework, since its use
only provides utility classes so that the DX and implementation speed is greatly improved.