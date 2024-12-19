import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET
  });

  const { pathname } = request.nextUrl;

  if (token && token?.refreshToken) {

    const cookieParts = (token?.refreshToken as String).split("; ");
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
    if (pathname === "/dang-nhap" || pathname === "/dang-ky") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
  } else {
    if (pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};
