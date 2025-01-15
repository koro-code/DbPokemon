"use server";

import { NextPage } from "next";
import Link from "next/link";

import List from "@/app/(ui)/search/_private/components/List";
import { Pokemon } from "@/app/(ui)/search/_private/components/List/Row";
import { fetchSparql } from "@/tools/sparql";

const Page: NextPage<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;

  const TYPE_COLORS: Record<string, string> = {
    Flying: "bg-sky-100 text-sky-800",
    Poison: "bg-purple-100 text-purple-800",
    Fire: "bg-red-100 text-red-800",
    Water: "bg-blue-100 text-blue-800",
    Bug: "bg-lime-100 text-lime-800",
    Normal: "bg-gray-100 text-gray-800",
    Electric: "bg-yellow-100 text-yellow-800",
    Ground: "bg-amber-100 text-amber-800",
    Fairy: "bg-pink-100 text-pink-800",
    Fighting: "bg-orange-100 text-orange-800",
    Psychic: "bg-fuchsia-100 text-fuchsia-800",
    Grass: "bg-green-100 text-green-800",
    Rock: "bg-brown-100 text-brown-800",
    Steel: "bg-gray-100 text-gray-800",
    Ice: "bg-cyan-100 text-cyan-800",
    Ghost: "bg-indigo-100 text-indigo-800",
    Dragon: "bg-violet-100 text-violet-800",
    Dark: "bg-black-100 text-black-800",
  };

  const pokemonQuery = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX poke: <https://pokemonkg.org/ontology#>
  PREFIX qudt: <http://qudt.org/schema/qudt/>

  SELECT DISTINCT
    ?label
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?type), "#PokéType:")) ; SEPARATOR=",") AS ?types)
    (STRAFTER(STR(?weightValue), "/value/") AS ?weight)
    (STRAFTER(STR(?heightValue), "/value/") AS ?height)
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?habitat), "#Habitat:")) ; SEPARATOR=",") AS ?habitats)
    (STRAFTER(STR(?colour), "resource/") AS ?colour)
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?abilities), "/ability/")) ; SEPARATOR=",") AS ?abilitiesList)
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?hiddenAbilities), "/ability/")) ; SEPARATOR=",") AS ?hiddenAbilitiesList)
    ?comment
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?egg), "#EggGroup:")) ; SEPARATOR=",") AS ?eggGroups)
    ?image
  WHERE {
    ?pokemon a poke:Species .
    ?pokemon rdfs:label ?label .
    FILTER(LANG(?label) = "en")
    
    ?pokemon poke:hasType ?type .
    ?pokemon poke:foundIn ?habitat .
    ?pokemon poke:hasColour ?colour .
    ?pokemon poke:mayHaveAbility ?abilities .
    ?pokemon poke:mayHaveHiddenAbility ?hiddenAbilities .
    ?pokemon rdfs:comment ?comment .
    ?pokemon poke:inEggGroup ?egg .
    ?image foaf:depicts ?pokemon .
    FILTER(CONTAINS(STR(?image), STR(STRAFTER(STR(?pokemon), "/pokemon/"))) && CONTAINS(STR(?image), ".png"))
    
    ?pokemon poke:hasHeight ?height .
    ?height qudt:quantityValue ?heightValue .
    
    ?pokemon poke:hasWeight ?weight .
    ?weight qudt:quantityValue ?weightValue .
    FILTER(CONTAINS(STR(?pokemon), "${id}"))
  }
  GROUP BY ?label ?weightValue ?heightValue ?colour ?comment ?image
  LIMIT 1`;

  const pokemons = await fetchSparql<Array<Pokemon>>(pokemonQuery);

  const pokemon = pokemons[0];

  if (!pokemon) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-medium text-red-600">
          Aucun Pokémon trouvé pour cet ID.
        </h2>
      </div>
    );
  }

  const COLOR_QUERY = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX poke: <https://pokemonkg.org/ontology#>
  PREFIX qudt: <http://qudt.org/schema/qudt/>
  
  SELECT DISTINCT
    (STRAFTER(STR(?pokemon), "/pokemon/") AS ?pokemonName)
    ?label
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?type), "#PokéType:")) ; SEPARATOR=",") AS ?types)
    (STRAFTER(STR(?weightValue), "/value/") AS ?weight)
    (STRAFTER(STR(?heightValue), "/value/") AS ?height)
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?habitat), "#Habitat:")) ; SEPARATOR=",") AS ?habitats)
    (STRAFTER(STR(?colour), "resource/") AS ?colour)
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?abilities), "/ability/")) ; SEPARATOR=",") AS ?abilitiesList)
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?hiddenAbilities), "/ability/")) ; SEPARATOR=",") AS ?hiddenAbilitiesList)
    ?comment
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?egg), "#EggGroup:")) ; SEPARATOR=",") AS ?eggGroups)
    ?image
    ?pokemon AS ?pokemonID
  WHERE {
    ?pokemon a poke:Species .
    ?pokemon rdfs:label ?label .
    FILTER(LANG(?label) = "en")
    
    # Filtrage par type Pokémon
    ?pokemon poke:hasType ?type .
    
    ?pokemon poke:foundIn ?habitat .
    ?pokemon poke:hasColour ?colour .
    ?pokemon poke:mayHaveAbility ?abilities .
    ?pokemon poke:mayHaveHiddenAbility ?hiddenAbilities .
    ?pokemon rdfs:comment ?comment .
    ?pokemon poke:inEggGroup ?egg .
    ?image foaf:depicts ?pokemon .
    FILTER(CONTAINS(STR(?image), STR(STRAFTER(STR(?pokemon), "/pokemon/"))) && CONTAINS(STR(?image), ".png"))
    
    # Récupération de la taille
    ?pokemon poke:hasHeight ?height .
    ?height qudt:quantityValue ?heightValue .
    
    # Récupération du poids
    ?pokemon poke:hasWeight ?weight .
    ?weight qudt:quantityValue ?weightValue .
    ?pokemon poke:hasColour <http://dbpedia.org/resource/${pokemon.colour.value}> .
  }
  GROUP BY ?pokemon ?label ?weightValue ?heightValue ?habitat ?colour ?comment ?image
  LIMIT 100`;

  const pokemonsOfSameColor = await fetchSparql<Array<Pokemon>>(COLOR_QUERY);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Image à gauche */}
        <div className="lg:w-1/3 p-6 bg-gradient-to-br from-sky-50 to-white flex justify-center items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={pokemon.image.value}
              alt={pokemon.label.value}
              className="w-full h-auto max-w-xs object-contain rounded-lg transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
        {/* Infos à droite */}
        <div className="lg:w-2/3 p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-sky-600 tracking-tight">
              {pokemon.label.value}
            </h1>
            <Link
              href={`/details/${id}/pokecard`}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-400 transition-all duration-300 hover:shadow-md"
            >
              Voir la carte
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {pokemon.types.value.split(",").map((type: string) => (
              <Link
                key={type}
                href={`/details/${type}/poketype`}
                className={`px-4 py-1 rounded-full text-sm font-medium ${TYPE_COLORS[type] || "bg-gray-200 text-gray-800"} hover:shadow-sm transition-shadow`}
              >
                {type}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  Caractéristiques
                </h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Taille</span>
                    <span className="font-medium">{pokemon.height.value}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Poids</span>
                    <span className="font-medium">{pokemon.weight.value}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Couleur</span>
                    <span className="font-medium">{pokemon.colour.value}</span>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  Habitats
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.habitats.value.split(",").map((habitat: string) => (
                    <Link
                      key={habitat}
                      href={`/details/${habitat}/habitat`}
                      className="px-3 py-1 bg-white rounded-full text-sm text-sky-600 hover:bg-sky-50 border border-sky-100 transition-colors"
                    >
                      {habitat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  Capacités
                </h3>
                <div className="space-y-2">
                  {pokemon.abilitiesList.value
                    .split(",")
                    .map((ability: string) => (
                      <Link
                        key={ability}
                        href={`/details/${ability}/ability`}
                        className="block px-3 py-2 bg-white rounded-lg text-sm hover:bg-sky-50 transition-colors"
                      >
                        {ability.charAt(0).toUpperCase() + ability.slice(1)}
                      </Link>
                    ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  Capacités cachées
                </h3>
                <p className="text-sm text-gray-700">
                  {pokemon.hiddenAbilitiesList.value}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  Groupes d'œufs
                </h3>
                <p className="text-sm text-gray-700">
                  {pokemon.eggGroups.value}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {pokemon.comment.value}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-sky-600 mb-6">
          Pokémons de la même couleur
        </h2>
        <List list={pokemonsOfSameColor} />
      </div>
    </>
  );
};

export default Page;
