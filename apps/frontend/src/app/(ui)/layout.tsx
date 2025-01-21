"use client";

import { NextPage } from "next";

import { PropsWithChildren } from "react";

import FilterBar from "./search/_private/FilterBar";

import SearchBar from "@/app/(ui)/search/_private/SearchBar";

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="p-8 mb-8">
          <h1 className="text-2xl font-bold mb-8">Rechercher un Pokémon</h1>
          <div className="flex gap-x-4">
            <div className="flex-1 bg-white border border-slate-200 rounded-lg hover:border-sky-200 focus-within:border-sky-200 transition-colors">
              <SearchBar title={"Nom"} />
            </div>
            <span className="text-slate-400 self-center">et</span>
            <div className="flex">
              <FilterBar title={"Caractéristiques"} />
            </div>
          </div>
        </div>
        <div className="px-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
