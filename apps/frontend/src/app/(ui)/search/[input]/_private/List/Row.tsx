"use server";

import Image from "next/image";
import Link from "next/link";

import { FC } from "react";

type PokemonValue = {
  value: string;
};

export type Pokemon = {
  pokemonName: PokemonValue;
  label: PokemonValue;
  types: PokemonValue;
  weight: PokemonValue;
  height: PokemonValue;
  habitats: PokemonValue;
  colour: PokemonValue;
  abilitiesList: PokemonValue;
  hiddenAbilitiesList: PokemonValue;
  comment: PokemonValue;
  eggGroups: PokemonValue;
  image: PokemonValue;
};

const colors: Record<string, string> = {
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

const Row: FC<Pokemon> = (props) => {
  const types = props.types.value.split(", ");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex items-start p-3 gap-4">
      <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-white flex items-center justify-center">
        <Image
          src={props.image.value}
          alt={props.pokemonName.value}
          fill
          sizes="(max-width: 128px) 100vw, 128px"
          className="object-contain p-1 hover:scale-110 transition-transform duration-300"
          priority
        />
      </div>
      <div className="flex-grow">
        <div className="mb-2">
          <div className="flex items-center gap-1 mb-1">
            <h3 className="font-semibold text-lg text-gray-800">
              {props.pokemonName.value}
            </h3>
          </div>
          <div className="flex flex-wrap gap-1 mb-1">
            {types.map((type) => (
              <Link
                href={`/type/${type}`}
                className={`px-3 py-0.5 rounded-full text-sm font-medium ${colors[type] || "bg-gray-200 text-gray-800"}`}
              >
                {type}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div>
              <span className="text-gray-500">Habitats:</span>{" "}
              {props.habitats.value}
            </div>
            <div>
              <span className="text-gray-500">Couleur:</span>{" "}
              {props.colour.value}
            </div>
            <div>
              <span className="text-gray-500">Taille:</span>{" "}
              {props.height.value}
            </div>
            <div>
              <span className="text-gray-500">Poids:</span> {props.weight.value}
            </div>
          </div>
        </div>
        <Link
          href={`/details/${props.pokemonName.value}/pokemon`}
          className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-400 transition-colors gap-1"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default Row;
