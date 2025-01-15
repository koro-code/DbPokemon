"use server";

import { MiddlewareConfig, NextMiddleware, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const middleware: NextMiddleware = async () => {
  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: [],
};

export default middleware;
