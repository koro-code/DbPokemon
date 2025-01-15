"use server";

import { cookies, headers } from "next/headers";

import { makeReq } from "./api";

const COOKIES_SESSION_TOKEN_KEY = "SESSION_TOKEN";

const save = async (token: string) => {
  const cks = await cookies();

  cks.set(COOKIES_SESSION_TOKEN_KEY, token, {
    path: "/",
    sameSite: "strict",
    secure: false,
    httpOnly: true,
  });
};

export const authentified = async () => {
  const cks = await cookies();

  return cks.has(COOKIES_SESSION_TOKEN_KEY);
};

export const register = async () => {
  const hdrs = await headers();

  const ip =
    hdrs.get("x-real-ip") ??
    hdrs.get("x-forwarded-for") ??
    hdrs.get("remote-addr");

  const agent = hdrs.get("user-agent");

  const ipv4 = ip?.replace("::ffff:", "");

  const { data } = await makeReq((c) =>
    c.POST("/auth/", {
      body: {
        ip: ipv4 ?? "0.0.0.0",
        agent: agent ?? "unknown",
      },
      cache: "no-cache",
    }),
  );

  if (!data) {
    throw new Error("Failed to register");
  }

  save(data.token);

  return data.token;
};

export const getToken = async () => {
  const cks = await cookies();

  return cks.get(COOKIES_SESSION_TOKEN_KEY)?.value;
};
