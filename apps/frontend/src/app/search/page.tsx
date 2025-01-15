// src/app/search/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-xl font-semibold">
        Résultats pour : <span className="text-green-400">{query}</span>
      </h2>
      <div className="mb-8 space-y-2">
        {/* Ici tu pourras lister tes résultats, par exemple depuis une API */}
        <p className="text-sm text-gray-300">
          (Aucun résultat réel pour le moment. Implémente ton API ou autre
          logique.)
        </p>
      </div>
      <button
        onClick={() => router.back()}
        className="px-4 py-2 font-semibold text-white bg-zinc-700 rounded hover:bg-zinc-600 transition-colors"
      >
        Retour
      </button>
    </div>
  );
}
