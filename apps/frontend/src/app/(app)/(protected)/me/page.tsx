"use server";

import { NextPage } from "next";

import { makeReq } from "@/tools/api";
import { getToken } from "@/tools/auth";

const Page: NextPage = async () => {
  const token = await getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const config = await makeReq((c) => {
    return c.GET("/server/config", {
      cache: "no-cache",
    });
  });

  if (config.error) {
    throw new Error("Failed to fetch config");
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Your Token</h1>
      <div>
        <h2 className="text-lg break-words">{token}</h2>
      </div>
      <br />
      <h1 className="text-2xl font-bold mb-4">Server Config</h1>
      <div>
        <h2 className="text-lg break-words">{JSON.stringify(config.data)}</h2>
      </div>
    </>
  );
};

export default Page;
