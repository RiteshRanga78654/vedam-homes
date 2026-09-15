/*
 * Next.js 16 renamed Middleware to Proxy. This proxy guards /admin
 * by redirecting unauthenticated visitors to the login page. The
 * session cookie itself is verified again inside every admin API
 * handler (defence in depth); the proxy only provides the redirect UX.
 */
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth-token";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = verifyToken(token);

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    if (pathname !== "/admin") loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};