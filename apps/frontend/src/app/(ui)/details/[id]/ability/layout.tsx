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
> = async ({ params, children }) => {
  const { id } = await params;

  return <BaseLayout title={`Capacité ${id}`}>{children}</BaseLayout>;
};

export default Layout;
