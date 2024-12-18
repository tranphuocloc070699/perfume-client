import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET
  });

  const { pathname } = request.nextUrl;

  // If logged in and accessing "dang-nhap" or "dang-ky", redirect to "/"
  if (token) {
    if (pathname === "/dang-nhap" || pathname === "/dang-ky") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // If not logged in and accessing "/user" pages, redirect to "/"
    if (pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow other requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dang-nhap",  // Match exactly "/dang-nhap"
    "/dang-ky",    // Match exactly "/dang-ky"
    "/user/:path*" // Match any route starting with "/user"
  ]
};
