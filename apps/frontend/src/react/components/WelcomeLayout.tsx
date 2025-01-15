"use server";

import Link from "next/link";

import { FC, PropsWithChildren, Suspense } from "react";

import FilterBar from "@/react/components/FilterBar";
import SearchBar from "@/react/components/SearchBar";

const WelcomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="bg-white shadow-sm rounded-lg p-4 mb-4">
          <Link
            href="/"
            className="inline-flex items-center hover:text-blue-600 transition-colors"
          >
            <span className="font-semibold text-lg">Pokedex</span>
          </Link>
        </header>
        <footer className="mb-8">
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
        </footer>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default WelcomeLayout;
