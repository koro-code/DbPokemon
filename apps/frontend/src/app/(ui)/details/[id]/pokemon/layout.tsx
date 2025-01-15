"use server";

import { NextPage } from "next";

import { PropsWithChildren } from "react";

import { DetailsLayout } from "../_private/Layout";

const Layout: NextPage<
  PropsWithChildren<{
    params: Promise<{
      id: string;
    }>;
  }>
> = async ({ params, children }) => {
  const { id } = await params;

  return (
    <DetailsLayout title={`Pokemon ${id} infos`}>{children}</DetailsLayout>
  );
};

export default Layout;
