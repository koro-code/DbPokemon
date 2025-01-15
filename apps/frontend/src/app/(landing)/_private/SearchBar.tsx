"use client";

import { redirect, RedirectType } from "next/navigation";

import { FC, useCallback, useState } from "react";

const SearchBar: FC = () => {
  const [input, setInput] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onClick = useCallback(() => {
    redirect(`/search/${input}`, RedirectType.push);
  }, [input]);

  return (
    <div className="flex items-center gap-2 p-4 mb-6 bg-white rounded shadow">
      <input
        type="text"
        onChange={onChange}
        placeholder="Rechercher..."
        className="flex-1 px-2 py-2 text-sm text-sky-900 rounded focus:outline-none"
      />
      <button
        onClick={onClick}
        className="px-4 py-2 text-sm font-semibold text-white bg-sky-500 rounded hover:bg-sky-400 transition-colors"
      >
        Rechercher
      </button>
    </div>
  );
};

export default SearchBar;
