"use client";

import { useParams, useRouter } from "next/navigation";

import { FormEvent, useState } from "react";

export default function SearchResultPage() {
  const router = useRouter();
  const { input } = useParams() || {};

  // Si `input` est un tableau, on récupère le premier élément ;
  // si c’est un string, on le prend tel quel ;
  // ou sinon, on met '' par défaut.
  const initialValue = Array.isArray(input) ? input[0] : input || "";

  const [query, setQuery] = useState(initialValue);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 p-4 mb-6 bg-white rounded shadow"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher..."
          className="flex-1 px-2 py-2 text-sm text-sky-900 rounded focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold text-white bg-sky-500 rounded hover:bg-sky-400 transition-colors"
        >
          Rechercher
        </button>
      </form>

      <h2 className="mb-4 text-xl font-semibold">
        Résultats pour : <span className="text-sky-600">{query}</span>
      </h2>

      <div className="mb-8 space-y-2">
        <p className="text-sm text-sky-800">
          (Aucun résultat réel pour le moment.)
        </p>
      </div>

      <button
        onClick={() => router.push("/")}
        className="px-4 py-2 font-semibold text-white bg-sky-500 rounded hover:bg-sky-400 transition-colors"
      >
        Accueil
      </button>
    </div>
  );
}
