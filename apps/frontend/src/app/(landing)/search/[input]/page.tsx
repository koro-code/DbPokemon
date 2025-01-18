"use server";

import { NextPage } from "next";

import List from "./_private/List";

const Page: NextPage<{
  params: Promise<{ input: string }>;
}> = async (props) => {
  const { input } = await props.params;

  // Encodage de la valeur d'entrée pour l'inclure dans la requête SPARQL
  const encodedInput = encodeURIComponent(input);

  // Base de l'URL SPARQL
  const sparqlEndpoint = "http://localhost:8890/sparql";

  // Définir la requête SPARQL de manière lisible
  const sparqlQuery = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
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
WHERE {
  ?pokemon a poke:Species .
  ?pokemon rdfs:label ?label .
  FILTER(LANG(?label) = "fr")
  
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
  FILTER(CONTAINS(STR(?pokemon), "${encodedInput}"))
}
GROUP BY ?pokemon ?label ?weightValue ?heightValue ?habitat ?colour ?comment ?image
LIMIT 100`;

  // Construction de l'URL de la requête avec paramètres
  const sparqlUrl = `${sparqlEndpoint}?query=${encodeURIComponent(sparqlQuery)}&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`;

  try {
    const response = await fetch(sparqlUrl);

    // Vérifie le statut de la réponse
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la requête SPARQL : ${response.statusText}`,
      );
    }

    const data = await response.json();
    const pokemons = data.results.bindings;

    const heading = `${pokemons.length} Pokémon${pokemons.length > 1 ? "s" : ""} trouvé${pokemons.length > 1 ? "s" : ""}`;

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
  } catch (error) {
    console.error("Erreur lors de la récupération des données SPARQL", error);
    return (
      <div>
        <h2>Erreur lors de la récupération des données</h2>
        <p>
          Veuillez vérifier la configuration du serveur SPARQL ou le format de
          la requête.
        </p>
      </div>
    );
  }
};

export default Page;
