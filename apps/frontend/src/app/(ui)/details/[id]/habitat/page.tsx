"use server";

import { NextPage } from "next";

import List from "@/app/(ui)/search/_private/components/List";
import { Pokemon } from "@/app/(ui)/search/_private/components/List/Row";
import { fetchSparql } from "@/tools/sparql";

const Page: NextPage<{
  params: Promise<{ id: string }>;
}> = async (props) => {
  const { id } = await props.params;

  const QUERY = `PREFIX rdf: <http://www.w3.org/1999/02/22/rdf-syntax-ns#>
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
  FILTER(CONTAINS(STR(?habitat), "${id}")) .
  
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
}
GROUP BY ?pokemon ?label ?weightValue ?heightValue ?habitat ?colour ?comment ?image
LIMIT 100
`;

  const pokemons = await fetchSparql<Array<Pokemon>>(QUERY);

  const heading = `${pokemons.length} Pokémon${pokemons.length > 1 ? "s" : ""} du type ${id} trouvé${pokemons.length > 1 ? "s" : ""}`;

  return (
    <div>
      <div className="pb-6 mb-6 border-b border-slate-200">
        <h2 className="text-xl font-medium text-slate-800 mb-2">
          Résultats pour l'habitat:{" "}
          <span className="text-sky-600 font-semibold">{id}</span>
        </h2>
        <p className="text-sm text-slate-500">{heading}</p>
      </div>
      <List list={pokemons} />
    </div>
  );
};

export default Page;
