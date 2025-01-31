"use server";

import { NextPage } from "next";

import { PropsWithChildren, Suspense } from "react";

import FilterBar from "./_private/components/FilterBar";

import SearchBar from "@/app/(ui)/search/_private/components/SearchBar";

const Layout: NextPage<PropsWithChildren> = async (props) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="p-8 mb-8">
          <h1 className="text-2xl font-bold mb-8">Rechercher un Pokémon</h1>
          <div className="flex gap-x-4">
            <div className="flex-1 bg-white border border-slate-200 rounded-lg hover:border-sky-200 focus-within:border-sky-200 transition-colors">
              <Suspense>
                <SearchBar title={"Nom"} />
              </Suspense>
            </div>
            <span className="text-slate-400 self-center">et</span>
            <div className="flex">
              <Suspense>
                <FilterBar title={"Caractéristiques"} />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="px-5">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
