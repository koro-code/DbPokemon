"use server";

import { NextPage } from "next";

import { PropsWithChildren } from "react";

import { BaseLayout } from "../_private/Layout";

const Layout: NextPage<
  PropsWithChildren<{
    params: Promise<{
      id: string;
    }>;
  }>
> = async ({ params }) => {
  const { id } = await params;

  return (
    <BaseLayout title={`Pokemon ${id} infos`}>Pokemon {id} infos</BaseLayout>
  );
};

export default Layout;
