import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

async function handleRefreshToken(token: JWT) {
  if (!token?.refreshToken) return null;

  const cookieParts = (token?.refreshToken as string)?.split("; ");
  const [nameValue, ...attributes] = cookieParts;
  const [name, value] = nameValue.split("=");
  const cookieAttributes = Object.fromEntries(
    attributes.map((attr) => {
      const [key, val] = attr.split("=");
      return [key.toLowerCase(), val || true];
    })
  );

  const response = NextResponse.next();
  response.cookies.set({
    name,
    value,
    ...cookieAttributes,
    expires: new Date(cookieAttributes?.expires as string)
  });

  return response;
}

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET
  });
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }


  if (token) {
    const refreshResponse = await handleRefreshToken(token);

    if (refreshResponse) {
      if (pathname === "/dang-nhap" || pathname === "/dang-ky") {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return refreshResponse;
    }
  }

  if (pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};
