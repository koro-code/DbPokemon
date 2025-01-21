"use server";

import List from "@/app/(ui)/search/[input]/_private/List";
import { NextPage } from "next";
import Link from "next/link";

const PokemonDetailPage: NextPage<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;

  const colors: Record<string, string> = {
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

  const sparqlEndpoint = "http://localhost:8890/sparql";

  const sparqlQuery = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX poke: <https://pokemonkg.org/ontology#>
  PREFIX qudt: <http://qudt.org/schema/qudt/>

  SELECT DISTINCT
    ?label
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?type), "#PokéType:")) ; SEPARATOR=", ") AS ?types)
    (STRAFTER(STR(?weightValue), "/value/") AS ?weight)
    (STRAFTER(STR(?heightValue), "/value/") AS ?height)
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?habitat), "#Habitat:")) ; SEPARATOR=", ") AS ?habitats)
    (STRAFTER(STR(?colour), "resource/") AS ?colour)
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?abilities), "/ability/")) ; SEPARATOR=", ") AS ?abilitiesList)
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?hiddenAbilities), "/ability/")) ; SEPARATOR=", ") AS ?hiddenAbilitiesList)
    ?comment
    (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?egg), "#EggGroup:")) ; SEPARATOR=", ") AS ?eggGroups)
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

  const sparqlUrl = `${sparqlEndpoint}?query=${encodeURIComponent(
    sparqlQuery
  )}&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`;

  const response = await fetch(sparqlUrl);

  if (!response.ok) {
    throw new Error(
      `Erreur lors de la requête SPARQL : ${response.statusText}`
    );
  }

  const data = await response.json();

  const pokemon = data.results.bindings[0];

  if (!pokemon) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-medium text-red-600">
          Aucun Pokémon trouvé pour cet ID.
        </h2>
      </div>
    );
  }

  const {
    label,
    types,
    weight,
    height,
    habitats,
    colour,
    abilitiesList,
    hiddenAbilitiesList,
    comment,
    eggGroups,
    image,
  } = pokemon;

  // Query to get all pokemons of the same color
  const colorQuery = `PREFIX rdf: <http://www.w3.org/1999/02/22/rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX poke: <https://pokemonkg.org/ontology#>
PREFIX qudt: <http://qudt.org/schema/qudt/>

SELECT DISTINCT
  (STRAFTER(STR(?pokemon), "/pokemon/") AS ?pokemonName)
  ?label
  (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?type), "#PokéType:")) ; SEPARATOR=", ") AS ?types)
  (STRAFTER(STR(?weightValue), "/value/") AS ?weight)
  (STRAFTER(STR(?heightValue), "/value/") AS ?height)
  (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?habitat), "#Habitat:")) ; SEPARATOR=", ") AS ?habitats)
  (STRAFTER(STR(?colour), "resource/") AS ?colour)
  (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?abilities), "/ability/")) ; SEPARATOR=", ") AS ?abilitiesList)
  (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?hiddenAbilities), "/ability/")) ; SEPARATOR=", ") AS ?hiddenAbilitiesList)
  ?comment
  (GROUP_CONCAT(DISTINCT STR(STRAFTER(STR(?egg), "#EggGroup:")) ; SEPARATOR=", ") AS ?eggGroups)
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
  ?pokemon poke:hasColour <http://dbpedia.org/resource/${colour.value}> .
}
GROUP BY ?pokemon ?label ?weightValue ?heightValue ?habitat ?colour ?comment ?image
LIMIT 100`;

  const colorUrl = `${sparqlEndpoint}?query=${encodeURIComponent(colorQuery)}&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`;

  const colorResponse = await fetch(colorUrl);
  if (!colorResponse.ok) {
    throw new Error(`Erreur lors de la requête SPARQL pour la couleur : ${colorResponse.statusText}`);
  }

  const colorData = await colorResponse.json();
  const pokemonsOfSameColor = colorData.results.bindings;
  console.log(pokemonsOfSameColor);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image à gauche */}
        <div className="lg:w-1/3 p-4 bg-gray-50 flex justify-center items-center">
          <img
            src={image.value}
            alt={label.value}
            className="w-full h-auto max-w-xs object-cover rounded-md border border-gray-200 shadow-md"
          />
        </div>
        {/* Infos à droite */}
        <div className="lg:w-2/3 p-6">
          <h1 className="text-3xl font-bold text-sky-600 mb-4">
            {label.value}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Type :</strong>
              <span className="flex gap-1 mt-1">
                {types.value.split(",").map((type: string) => (
                  <Link
                    key={type}
                    href={`/details/${type}/poketype`}
                    className={`px-3 py-0.5 rounded-full text-sm font-medium ${colors[type] || "bg-gray-200 text-gray-800"}`}
                  >
                    {type}
                  </Link>
                ))}
              </span>
            </p>
            <p>
              <strong>Poids :</strong> {weight.value}
            </p>
            <p>
              <strong>Taille :</strong> {height.value}
            </p>
            <p>
              <strong>Habitat :</strong> {habitats.value}
            </p>
            <p>
              <strong>Couleur :</strong> {colour.value}
            </p>
            <p>
              <strong>Capacités :</strong> {abilitiesList.value}
            </p>
            <p>
              <strong>Capacités cachées :</strong> {hiddenAbilitiesList.value}
            </p>
            <p>
              <strong>Groupes d'œufs :</strong> {eggGroups.value}
            </p>
          </div>
          <div className="mt-4">
            <p>
              <strong>Description :</strong> {comment.value}
            </p>
          </div>
        </div>
      </div>

      {/* Liste des Pokémon de la même couleur */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-sky-600 mb-4">Pokémons de la même couleur :</h2>
        <List list={pokemonsOfSameColor} />
      </div>
    </div>
  );
};

export default PokemonDetailPage;
