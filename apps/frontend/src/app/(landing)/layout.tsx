"use server";

import { NextPage } from "next";

import { PropsWithChildren } from "react";

import SearchBar from "@/app/(landing)/_private/SearchBar";

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-4">
        <SearchBar />
      </div>
      {children}
    </div>
  );
};

export default Layout;
