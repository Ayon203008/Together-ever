import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // If visiting admin route but not admin
  if (pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (token.role !== "admin")
      return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
