"use server";

import { NextPage } from "next";

import { PropsWithChildren } from "react";

import SearchBar from "@/app/(landing)/_private/SearchBar";

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SearchBar />
      <div className="mt-10">{children}</div>
    </>
  );
};

export default Layout;
