import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // Allow the requests if the following is true
  const { pathname } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have token and are requesting protected routes
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
