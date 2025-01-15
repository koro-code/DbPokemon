"use server";

import { NextPage } from "next";

const Page: NextPage<{
  params: Promise<{
    id: string;
  }>;
}> = async ({ params }) => {
  const { id } = await params;

  return <div>Pokemon {id} infos</div>;
};

export default Page;
