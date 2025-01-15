"use server";

import { NextPage } from "next";
import Link from "next/link";

import { PropsWithChildren } from "react";

import { DetailsLayout } from "../_private/Layout";

const TYPE_COLORS: Record<string, string> = {
  Flying: "bg-sky-100 text-sky-800",
  Poison: "bg-purple-100 text-purple-800",
  Fire: "bg-red-100 text-red-800",
  Water: "bg-blue-100 text-blue-800",
  Bug: "bg-lime-100 text-lime-800",
  Normal: "bg-gray-100 text-gray-800",
  Electric: "bg-yellow-100 text-yellow-800",
  Ground: "bg-amber-100 text-amber-800",
  Fairy: "bg-pink-100 text-pink-800",
  Fighting: "bg-orange-100 text-orange-800",
  Psychic: "bg-fuchsia-100 text-fuchsia-800",
  Grass: "bg-green-100 text-green-800",
  Rock: "bg-brown-100 text-brown-800",
  Steel: "bg-gray-100 text-gray-800",
  Ice: "bg-cyan-100 text-cyan-800",
  Ghost: "bg-indigo-100 text-indigo-800",
  Dragon: "bg-violet-100 text-violet-800",
  Dark: "bg-black-100 text-black-800",
};

const Layout: NextPage<
  PropsWithChildren<{
    params: Promise<{
      id: string;
    }>;
  }>
> = async ({ params, children }) => {
  const { id } = await params;

  return (
    <DetailsLayout title={`Type ${id}`}>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-sm">
          {Object.keys(TYPE_COLORS).map((type) => (
            <Link
              key={type}
              href={`/details/${type}/poketype`}
              className={`px-3 py-0.5 rounded-full text-sm font-medium ${TYPE_COLORS[type] || "bg-gray-200 text-gray-800"}`}
            >
              {type}
            </Link>
          ))}
        </div>
      </div>
      {children}
    </DetailsLayout>
  );
};

export default Layout;
