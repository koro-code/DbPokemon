"use client";

import { redirect, RedirectType, useSearchParams } from "next/navigation";

import { FC, useEffect, useMemo, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { SearchFilter } from "../../app/(ui)/search/_private/api/sparql";

const SearchBar: FC<{ title: string }> = (props) => {
  const searchParams = useSearchParams();

  const filterValue: SearchFilter = useMemo(() => {
    const filterParam = searchParams.get("filter");

    if (filterParam) {
      return JSON.parse(filterParam);
    }

    return {};
  }, [searchParams]);

  const [search, setSearch] = useState(filterValue.name);

  useEffect(() => {
    setSearch(filterValue.name);
  }, [filterValue.name]);

  return (
    <form
      className="flex items-center gap-2 px-4 py-3 text-slate-700"
      onSubmit={(e) => {
        e.preventDefault();

        const filter: SearchFilter = {
          ...filterValue,
          name: search,
        };

        redirect(`/search?filter=${JSON.stringify(filter)}`, RedirectType.push);
      }}
    >
      <MagnifyingGlassIcon className="w-5 h-5" />
      <input
        type="text"
        key={"search"}
        defaultValue={filterValue.name}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        placeholder={props.title}
        className="flex-1 border-none focus:ring-0 focus:outline-none placeholder:text-slate-500 bg-transparent"
      />
    </form>
  );
};

export default SearchBar;
