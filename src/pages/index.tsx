import type { NextPage } from "next";
import { Pokemon } from "src/components/Pokemon";

const Home: NextPage = () => {
  return (
    <div className="w-2/5 h-full my-5 mx-auto text-center">
      <Pokemon />
    </div>
  );
};

export default Home;
