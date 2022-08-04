import type { ComponentMeta, Story } from "@storybook/react";
import React from "react";
import { createQueryProvider } from "../../utils/mockQueryClient";
import { pokemonHandler } from "../../msw/handlers/pokemonMock";
import { Pokemon } from "./Pokemon.data";

export default {
  title: "Example/Pokemon",
  component: Pokemon,
  parameters: {
    msw: [pokemonHandler],
  },
} as ComponentMeta<typeof Pokemon>;

const Template: Story = () => {
  const QueryProvider = createQueryProvider();
  return (
    <QueryProvider>
      <Pokemon />
    </QueryProvider>
  );
};

export const Default = Template.bind({});
