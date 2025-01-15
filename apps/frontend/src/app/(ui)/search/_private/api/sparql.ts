export type SearchFilter = Partial<{
  name: string;
  type: string;
  size: string;
  weight: string;
}>;

export const getSparqlQuery = async ({
  name,
  type,
  weight,
}: SearchFilter): Promise<string> => {
  return `
PREFIX rdf: <http://www.w3.org/1999/02/22/rdf-syntax-ns#>
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
  ?pokemon AS ?pokemonID  # Ajout de l'ID du Pokémon
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
  
  # Récupération de la taille
  ?pokemon poke:hasHeight ?height .
  ?height qudt:quantityValue ?heightValue .
  
  # Récupération du poids
  ?pokemon poke:hasWeight ?weight .
  ?weight qudt:quantityValue ?weightValue .
  
  ${type ? `FILTER(CONTAINS(STR(?type), "${type}"))` : ""}
  ${name ? `FILTER(CONTAINS(STRAFTER(STR(?pokemon), "/pokemon/"), "${name}"))` : ""}
  ${weight ? `FILTER(CONTAINS(STR(?weightValue), "${weight}"))` : ""}
}
GROUP BY ?pokemon ?label ?weightValue ?heightValue ?habitat ?colour ?comment ?image
LIMIT 100
`;
};
