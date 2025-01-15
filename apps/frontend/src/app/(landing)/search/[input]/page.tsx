"use server";

import { NextPage } from "next";
import Link from "next/link";

const Page: NextPage<{
  params: Promise<{ input: string }>;
}> = async (props) => {
  const { input } = await props.params;

  const pokemons = [
    { id: 1, name: "Bulbasaur" },
    { id: 2, name: "Ivysaur" },
    { id: 3, name: "Venusaur" },
  ];

  const heading = `${pokemons.length} Pokémon${pokemons.length > 1 ? "s" : ""} trouvé ${pokemons.length > 1 ? "s" : ""}`;

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">
        Résultats pour : <span className="text-sky-600">{input}</span>
      </h2>
      <div className="mb-8 space-y-2">
        <p className="text-sm text-sky-800">{heading}</p>
        <div>
          {pokemons.map((pokemon) => (
            <Link
              key={pokemon.id}
              href={`/info/${pokemon.id}`}
              className="px-2 py-1 text-sm font-semibold text-white bg-sky-500 rounded hover:bg-sky-400 transition-colors"
            >
              {pokemon.name}
            </Link>
          ))}
        </div>
      </div>
      <Link
        href="../"
        className="px-4 py-2 font-semibold text-white bg-sky-500 rounded hover:bg-sky-400 transition-colors"
      >
        Accueil
      </Link>
    </>
  );
};

export default Page;
