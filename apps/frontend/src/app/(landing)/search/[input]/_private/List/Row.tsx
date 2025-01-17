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
  height: string | number;
  weight: string | number;
  color: string;
  category: string;
}> = (props) => {
  // Debug : Vérifier les données reçues
  console.log("Props reçus :", props);

  // Extraire la couleur depuis l'URI si nécessaire
  const color = "bleu";

  // Convertir `height` et `weight` s'ils sont sous forme d'URI
  const height = typeof props.height === "string" && props.height.startsWith("http")
    ? parseFloat(props.height.split("/").pop() || "0")
    : props.height;

  const weight = typeof props.weight === "string" && props.weight.startsWith("http")
    ? parseFloat(props.weight.split("/").pop() || "0")
    : props.weight;

  // Gestion des types (chaîne → tableau)
  const types = "fire,water,grass".split(",");

  // Couleurs pour les types
  const typeColors: Record<string, string> = {
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
  };

  console.log("Image:", props.image.value);

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
            <span className="text-gray-500 text-xs font-medium">#1</span>
            <h3 className="font-semibold text-lg text-gray-800">{props.pokemonName.value}</h3>
          </div>

          <div className="flex flex-wrap gap-1 mb-1">
            {types.map((type) => (
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
              {/* <span className="text-gray-500">Catégorie:</span> {props.category || "Inconnu"} */}
            </div>
            {/* <div>
              <span className="text-gray-500">Couleur:</span> {color}
            </div>
            <div>
              <span className="text-gray-500">Taille:</span> {height}m
            </div>
            <div>
              <span className="text-gray-500">Poids:</span> {weight}kg
            </div> */}
          </div>
        </div>

        {/* <Link
          href={`/info/${props.id}`}
          className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-400 transition-colors gap-1"
        >
          Voir les détails
        </Link> */}
      </div>
    </div>
  );
};

export default Row;