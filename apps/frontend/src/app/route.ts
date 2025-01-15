import { redirect, RedirectType } from "next/navigation";

export const GET = async () => {
  redirect("/search", RedirectType.replace);
};
