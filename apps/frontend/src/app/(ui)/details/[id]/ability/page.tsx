"use server";

import { NextPage } from "next";

import List from "@/app/(ui)/search/_private/components/List";
import {
  Pokemon,
  PokemonValue,
} from "@/app/(ui)/search/_private/components/List/Row";
import { fetchSparql } from "@/tools/sparql";

const Page: NextPage<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;

  const QUERY_GET_DETAILS_ABILITY = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX poke: <https://pokemonkg.org/ontology#>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>

  SELECT DISTINCT 
      ?ability 
      (SAMPLE(?label) AS ?label) 
      (SAMPLE(?description) AS ?description) 
  WHERE {
      ?ability rdf:type poke:Ability .
      OPTIONAL { ?ability rdfs:label ?label . }
      OPTIONAL { ?ability poke:effectDescription ?description . }
      FILTER(
          langmatches(lang(?label), "en") &&
          langmatches(lang(?description), "en") &&
          contains(str(?ability), "${id}")
      )
  }
  GROUP BY ?ability
  ORDER BY ?ability
  LIMIT 1`;

  const QUERY = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
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
    
    FILTER(CONTAINS(LCASE(STR(?abilities)), LCASE("${id}")) || CONTAINS(LCASE(STR(?hiddenAbilities)), LCASE("${id}")))
  }
  GROUP BY ?pokemon ?label ?weightValue ?heightValue ?habitat ?colour ?comment ?image
  LIMIT 100`;

  const pokemons = await fetchSparql<Array<Pokemon>>(QUERY);

  const abilities = await fetchSparql<
    Array<{
      ability: PokemonValue;
      label: PokemonValue;
      description: PokemonValue;
    }>
  >(QUERY_GET_DETAILS_ABILITY);

  const ability = abilities[0];

  return (
    <>
      <div className="bg-white shadow-md rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">{id}</h1>

        {ability ? (
          <div className="mb-4">
            <p className="text-slate-600">{ability.description.value}</p>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-slate-600">No description available</p>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="pb-6 mb-6 border-b border-slate-200">
          <h2 className="text-xl font-medium text-slate-800 mb-2">
            Pokémons avec la capacité:{" "}
            <span className="text-sky-600 font-semibold">{id}</span>
          </h2>
          <p className="text-sm text-slate-500">
            {pokemons.length} Pokémon{pokemons.length > 1 ? "s" : ""} trouvé
            {pokemons.length > 1 ? "s" : ""}
          </p>
        </div>
        <List list={pokemons} />
      </div>
    </>
  );
};

export default Page;
