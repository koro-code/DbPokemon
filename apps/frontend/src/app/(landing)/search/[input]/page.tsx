"use server";

import { NextPage } from "next";
import List from "./_private/List";

const Page: NextPage<{
  params: Promise<{ input: string }>;
}> = async (props) => {
  const { input } = await props.params;

  // Encodage de la valeur d'entrée pour l'inclure dans la requête SPARQL
  const encodedInput = encodeURIComponent(input);

  // Requête SPARQL avec la valeur intégrée dynamiquement
  const sparqlUrl = `http://localhost:8890/sparql?default-graph-uri=&query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0D%0APREFIX+poke%3A+%3Chttps%3A%2F%2Fpokemonkg.org%2Fontology%23%3E%0D%0APREFIX+qudt%3A+%3Chttp%3A%2F%2Fqudt.org%2Fschema%2Fqudt%2F%3E%0D%0A%0D%0ASELECT+DISTINCT%0D%0A++++%28STRAFTER%28STR%28%3Fpokemon%29%2C+%22%2Fpokemon%2F%22%29+AS+%3FpokemonName%29++%23+D%C3%A9finir+pokemonName%0D%0A++++%3Flabel%0D%0A++++%28GROUP_CONCAT%28DISTINCT+STR%28STRAFTER%28STR%28%3Ftype%29%2C+%22%23Pok%C3%A9Type%3A%22%29%29+%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Ftypes%29++%23+Extraire+uniquement+le+nom+du+type%0D%0A++++%3Fweight%0D%0A++++%3Fheight%0D%0A++++%28GROUP_CONCAT%28DISTINCT+STR%28STRAFTER%28STR%28%3Fhabitat%29%2C+%22%23Habitat%3A%22%29%29+%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3Fhabitats%29%0D%0A++++%3Fcolour%0D%0A++++%28GROUP_CONCAT%28DISTINCT+STR%28%3Fabilities%29%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3FabilitiesList%29%0D%0A++++%28GROUP_CONCAT%28DISTINCT+STR%28%3FhiddenAbilities%29%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3FhiddenAbilitiesList%29%0D%0A++++%3Fcomment%0D%0A++++%28GROUP_CONCAT%28DISTINCT+STR%28%3Fegg%29%3B+SEPARATOR%3D%22%2C+%22%29+AS+%3FeggGroups%29%0D%0A++++%3Fimage++%23+Ajouter+l%27image%0D%0AWHERE+%7B%0D%0A++++%23+Pok%C3%A9mon%0D%0A++++%3Fpokemon+a+poke%3ASpecies+.%0D%0A%0D%0A++++%23+Nom+du+Pok%C3%A9mon%0D%0A++++%3Fpokemon+rdfs%3Alabel+%3Flabel+.%0D%0A++++FILTER%28LANG%28%3Flabel%29+%3D+%22fr%22%29+%23+Filtrer+pour+le+label+en+fran%C3%A7ais%0D%0A%0D%0A++++%23+Type+du+Pok%C3%A9mon%0D%0A++++%3Fpokemon+poke%3AhasType+%3Ftype+.%0D%0A%0D%0A++++%23+Poids+et+taille%0D%0A++++%3Fpokemon+poke%3AhasWeight+%3Fweight+.%0D%0A++++%3Fpokemon+poke%3AhasHeight+%3Fheight+.%0D%0A%0D%0A++++%23+Habitat%0D%0A++++%3Fpokemon+poke%3AfoundIn+%3Fhabitat+.%0D%0A%0D%0A++++%23+Couleur%0D%0A++++%3Fpokemon+poke%3AhasColour+%3Fcolour+.%0D%0A%0D%0A++++%23+Capacit%C3%A9s+et+capacit%C3%A9s+cach%C3%A9es%0D%0A++++%3Fpokemon+poke%3AmayHaveAbility+%3Fabilities+.%0D%0A++++%3Fpokemon+poke%3AmayHaveHiddenAbility+%3FhiddenAbilities+.%0D%0A%0D%0A++++%23+Commentaire%0D%0A++++%3Fpokemon+rdfs%3Acomment+%3Fcomment+.%0D%0A%0D%0A++++%23+Genus%0D%0A++++%3Fpokemon+poke%3AinEggGroup+%3Fegg+.%0D%0A%0D%0A++++%23+R%C3%A9cup%C3%A9rer+l%27image+correspondant+au+Pok%C3%A9mon+%28filtres+par+nom+en+anglais+et+extension+.png%29%0D%0A++++%3Fimage+foaf%3Adepicts+%3Fpokemon+.%0D%0A++++FILTER%28CONTAINS%28STR%28%3Fimage%29%2C+STR%28STRAFTER%28STR%28%3Fpokemon%29%2C+%22%2Fpokemon%2F%22%29%29%29+%26%26+CONTAINS%28STR%28%3Fimage%29%2C+%22.png%22%29%29%0D%0A%0D%0A++++%23+Filtrer+si+n%C3%A9cessaire+%28par+exemple+pour+Pikachu%29%0D%0A+++%0D%0A++++FILTER%28CONTAINS%28STR%28%3Fpokemon%29%2C+%22${encodedInput}%22%29%29+%23+Filtre+pour+le+Pok%C3%A9mon+sp%C3%A9cifique%0D%0A%7D%0D%0AGROUP+BY+%3Fpokemon+%3Flabel+%3Fweight+%3Fheight+%3Fhabitat+%3Fcolour+%3Fcomment+%3Fimage%0D%0ALIMIT+100%0D%0A&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`;

  try {
    const response = await fetch(sparqlUrl);

    // Vérifie le statut de la réponse
    if (!response.ok) {
      throw new Error(`Erreur lors de la requête SPARQL : ${response.statusText}`);
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
        <p>Veuillez vérifier la configuration du serveur SPARQL ou le format de la requête.</p>
      </div>
    );
  }
};

export default Page;
