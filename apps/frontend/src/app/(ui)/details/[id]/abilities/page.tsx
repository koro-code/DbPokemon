"use server";

import { NextPage } from "next";
import Link from "next/link";

import { fetchSparql } from "@/tools/sparql";

const Page: NextPage<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;

  const QUERY = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX poke: <https://pokemonkg.org/ontology#>
  
    SELECT DISTINCT ?ability (SAMPLE(?label) AS ?label) (SAMPLE(?description) AS ?description) (GROUP_CONCAT(DISTINCT STRAFTER(STR(?pokemonWithPossesion), "https://pokemonkg.org/instance/pokemon/") ; SEPARATOR=", ") AS ?pokemonsInPossession) (GROUP_CONCAT(DISTINCT ?pokemonWithHiddenPossesion ; SEPARATOR=", ") AS ?pokemonWithHiddenPossesion )
    WHERE {
    ?ability rdf:type poke:Ability .
    ?pokemonWithPossesion poke:mayHaveAbility ?ability.
    ?pokemonWithHiddenPossesion poke:mayHaveAbility ?ability.
    OPTIONAL { ?ability rdfs:label ?label . }
    OPTIONAL { ?ability poke:effectDescription ?description . }
    FILTER(langmatches(lang(?label ), "en") && langmatches(lang(?description), "en") && langmatches(lang(?description ), "en") && contains(str(?ability), "${id}"))
    }
    GROUP BY ?ability
    ORDER BY ?ability
    LIMIT 1
  `;

  const abilities = await fetchSparql(QUERY);

  const abilityData = abilities[0];

  if (!abilityData) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-medium text-red-600">
          Aucune capacité trouvée pour cet identifiant.
        </h2>
      </div>
    );
  }

  const { label, description, pokemonsInPossession } = abilityData;

  const pokemonsPossessionList = pokemonsInPossession?.value
    ? pokemonsInPossession.value.split(", ")
    : [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="lg:w-2/3 p-6">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">
            {label.value}
          </h1>
          <div className="grid grid-cols-1 gap-4">
            <p className="text-gray-700">
              <strong>Description :</strong>
              <span className="block mt-1">{description.value}</span>
            </p>
            <div className="text-gray-700">
              <strong>Pokémons avec cette capacité :</strong>
              <ul className="mt-2 space-y-4">
                {pokemonsPossessionList.length > 0 ? (
                  pokemonsPossessionList.map((pokemonName: string) => (
                    <li
                      key={pokemonName}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={`https://pokemonkg.org/media/image/globallink/pokemon/${pokemonName.toLowerCase()}.png`}
                        alt={pokemonName}
                        className="w-12 h-12 object-cover rounded-full shadow-md"
                      />
                      <Link
                        href={`/details/${encodeURIComponent(pokemonName)}/pokemon`}
                        className="text-blue-500 font-medium hover:underline"
                      >
                        {pokemonName.charAt(0).toUpperCase() +
                          pokemonName.slice(1)}
                      </Link>
                    </li>
                  ))
                ) : (
                  <span>Aucun Pokémon avec cette capacité.</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
