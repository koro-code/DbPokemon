"use server";

import Image from "next/image";
import Link from "next/link";

import { FC } from "react";

const Row: FC<{
  id: number;
  name: string;
  image: string;
  description: string;
  types: string[];
  height: number;
  weight: number;
  color: string;
  category: string;
}> = (props) => {
  const typeColors: Record<string, string> = {
    Plante: "bg-green-100 text-green-800",
    Poison: "bg-purple-100 text-purple-800",
    Feu: "bg-red-100 text-red-800",
    Eau: "bg-blue-100 text-blue-800",
    Vol: "bg-sky-100 text-sky-800",
    Insecte: "bg-lime-100 text-lime-800",
    Normal: "bg-gray-100 text-gray-800",
    Électrik: "bg-yellow-100 text-yellow-800",
    Sol: "bg-amber-100 text-amber-800",
    Fée: "bg-pink-100 text-pink-800",
    Combat: "bg-orange-100 text-orange-800",
    Psy: "bg-fuchsia-100 text-fuchsia-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex items-start p-3 gap-4">
      <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-white flex items-center justify-center">
        <Image
          src={props.image}
          alt={props.name}
          fill
          sizes="(max-width: 128px) 100vw, 128px"
          className="object-contain p-1 hover:scale-110 transition-transform duration-300"
          priority
        />
      </div>
      <div className="flex-grow">
        <div className="mb-2">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-gray-500 text-xs font-medium">
              #{props.id}
            </span>
            <h3 className="font-semibold text-lg text-gray-800">
              {props.name}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1 mb-1">
            {props.types.map((type) => (
              <span
                key={type}
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[type] || "bg-gray-100 text-gray-800"}`}
              >
                {type}
              </span>
            ))}
          </div>

          <p className="text-gray-600 text-xs mb-2">{props.description}</p>

          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div>
              <span className="text-gray-500">Catégorie:</span> {props.category}
            </div>
            <div>
              <span className="text-gray-500">Couleur:</span> {props.color}
            </div>
            <div>
              <span className="text-gray-500">Taille:</span> {props.height}m
            </div>
            <div>
              <span className="text-gray-500">Poids:</span> {props.weight}kg
            </div>
          </div>
        </div>

        <Link
          href={`/info/${props.id}`}
          className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-400 transition-colors gap-1"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default Row;
