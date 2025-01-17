"use server";

import { NextPage } from "next";

const Page: NextPage = () => {
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
};

export default Page;
