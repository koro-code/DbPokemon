"use server";

import { NextPage } from "next";
import Link from "next/link";

import { PropsWithChildren } from "react";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Layout: NextPage<PropsWithChildren> = async (props) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link
            href="../"
            className="inline-flex items-center gap-2 px-4 py-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour à la recherche</span>
          </Link>
        </div>
        <div className="px-5">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
