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
      description:
        "Il y a une graine sur son dos depuis sa naissance. Elle grossit un peu chaque jour.",
      types: ["Plante", "Poison"],
      height: 0.7,
      weight: 6.9,
      color: "Vert",
      category: "Graine",
    },
    {
      id: 2,
      name: "Ivysaur",
      image:
        "https://pokemonkg.org/media/image/sugimori-early/pokemon/abra-gen1.jpg",
      description:
        "Le bulbe sur son dos devient si gros qu'il ne peut plus se tenir sur ses pattes arrière.",
      types: ["Plante", "Poison"],
      height: 1.0,
      weight: 13.0,
      color: "Vert",
      category: "Graine",
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
