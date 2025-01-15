"use server";

import { NextPage } from "next";

import { PropsWithChildren } from "react";

const Layout: NextPage<PropsWithChildren> = async (props) => {
  return (
    <>
      <div className="container">
        <div className="max-w-4xl mx-auto">{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
