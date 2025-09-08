import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const { url, headers } = req;
  console.log("url---------------------", url);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
