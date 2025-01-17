"use server";

import Image from "next/image";
import Link from "next/link";

import { FC } from "react";

const Row: FC<{
  id: number;
  name: string;
  image: string;
}> = (props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex items-center p-4 gap-6">
      <div className="relative h-32 w-32 flex-shrink-0 rounded-lg overflow-hidden bg-white flex items-center justify-center">
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
        <div className="mb-3">
          <span className="text-gray-500 text-sm font-medium">#{props.id}</span>
          <h3 className="font-semibold text-xl text-gray-800">{props.name}</h3>
        </div>
        <Link
          href={`/info/${props.id}`}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-400 transition-colors gap-2"
        >
          Voir les détails
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Row;
