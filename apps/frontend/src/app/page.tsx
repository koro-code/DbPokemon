// src/app/page.tsx
"use client";

import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 bg-zinc-700 rounded p-4"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher..."
          className="flex-1 px-2 py-2 text-sm text-black rounded focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-500 transition-colors"
        >
          Rechercher
        </button>
      </form>
    </div>
  );
}
