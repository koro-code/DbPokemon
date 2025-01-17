"use client";

import { useRouter } from "next/navigation";

import { FC, FormEvent, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar: FC<{ title: string }> = (props) => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-4 py-3 text-slate-700"
    >
      <MagnifyingGlassIcon className="w-5 h-5" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={props.title}
        className="flex-1 border-none focus:ring-0 focus:outline-none  placeholder:text-slate-500 bg-transparent"
      />
    </form>
  );
};

export default SearchBar;
