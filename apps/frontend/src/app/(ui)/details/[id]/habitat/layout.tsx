"use client";

import { NextPage } from "next";

import { PropsWithChildren } from "react";

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="px-5">{children}</div>
    </div>
  );
};

export default Layout;
