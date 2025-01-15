"use server";

import { NextPage } from "next";

import { getSparqlQuery, SearchFilter } from "./_private/api/sparql";
import List from "./_private/components/List";
import { Pokemon } from "./_private/components/List/Row";

import { fetchSparql } from "@/tools/sparql";

const Page: NextPage<{
  searchParams: Promise<{
    filter?: string;
  }>;
}> = async (props) => {
  const { filter } = await props.searchParams;

  const queryFilters: SearchFilter = filter ? JSON.parse(filter) : {};

  if (Object.values(queryFilters).every((v) => !v)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Aucune recherche effectuée
          </h2>
          <p className="text-gray-600 mb-8">
            Veuillez saisir un terme de recherche pour trouver des Pokémon.
          </p>
        </div>
      </div>
    );
  }

  const sparqlQuery = await getSparqlQuery(queryFilters);

  const pokemons = await fetchSparql<Array<Pokemon>>(sparqlQuery);

  const heading = `${pokemons.length} Pokémon${pokemons.length > 1 ? "s" : ""} trouvé${pokemons.length > 1 ? "s" : ""}`;

  return (
    <>
      <div className="pb-6 mb-6 border-b border-slate-200">
        <h2 className="text-xl font-medium text-slate-800 mb-2">
          Résultats pour:{" "}
          <span className="text-sky-600 font-semibold">
            {queryFilters.name}
          </span>
        </h2>
        <p className="text-sm text-slate-500">{heading}</p>
      </div>
      <List list={pokemons} />
    </>
  );
};

export default Page;
