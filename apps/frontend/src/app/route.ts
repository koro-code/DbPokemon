"use server";

import { redirect, RedirectType } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  void req;
  return redirect("/auth/register", RedirectType.replace);
};
