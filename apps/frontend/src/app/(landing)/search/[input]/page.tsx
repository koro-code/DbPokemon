"use server";

import { NextPage } from "next";

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
    <div>
      <div className="pb-6 mb-6 border-b border-slate-200">
        <h2 className="text-xl font-medium text-slate-800 mb-2">
          Résultats pour:{" "}
          <span className="text-sky-600 font-semibold">{input}</span>
        </h2>
        <p className="text-sm text-slate-500">{heading}</p>
      </div>
      <List list={pokemons} />
    </div>
  );
};

export default Page;
