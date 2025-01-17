"use client";

import { useRouter } from "next/navigation";

import { FC, FormEvent, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar: FC = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <div className="flex items-center gap-2 px-4 h-full">
        <MagnifyingGlassIcon className="w-5 h-5 text-slate-700" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom"
          className="flex-1 border-none focus:ring-0 focus:outline-none text-slate-700 placeholder:text-slate-500 bg-transparent h-full"
        />
      </div>
    </form>
  );
};

export default SearchBar;
