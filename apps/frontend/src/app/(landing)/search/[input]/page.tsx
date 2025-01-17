"use server";

import { NextPage } from "next";
import Link from "next/link";

import List from "./_private/List";

const Page: NextPage<{
  params: Promise<{ input: string }>;
}> = async (props) => {
  const { input } = await props.params;

  const pokemons = [
    {
      id: 1,
      name: "Bulbasaur",
      image:
        "https://pokemonkg.org/media/image/sugimori-early/pokemon/abra-gen1.jpg",
    },
    {
      id: 2,
      name: "Ivysaur",
      image:
        "https://pokemonkg.org/media/image/sugimori-early/pokemon/abra-gen1.jpg",
    },
    {
      id: 3,
      name: "Venusaur",
      image:
        "https://pokemonkg.org/media/image/sugimori-early/pokemon/abra-gen1.jpg",
    },
  ];

  const heading = `${pokemons.length} Pokémon${pokemons.length > 1 ? "s" : ""} trouvé ${pokemons.length > 1 ? "s" : ""}`;

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="mb-4 text-2xl font-semibold">
        Résultats pour : <span className="text-sky-600">{input}</span>
      </h2>
      <div className="mb-6">
        <p className="mb-3 text-sm text-sky-800">{heading}</p>
        <List list={pokemons} />
      </div>
      <Link
        href="../"
        className="inline-block px-6 py-2 font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-400 transition-colors"
      >
        Accueil
      </Link>
    </div>
  );
};

export default Page;
