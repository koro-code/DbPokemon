"use client";

import { useRouter } from "next/navigation";

import { FC } from "react";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const BackButton: FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors duration-200"
    >
      <ArrowLeftIcon className="w-5 h-5" />
      <span>Retour</span>
    </button>
  );
};

export default BackButton;
