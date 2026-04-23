import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for login page, auth API, and Next.js internals
  // (handled at matcher level below, but double-check here)
  if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("pfect-access");
  const password   = process.env.ACCESS_PASSWORD ?? "pfect2025";

  if (authCookie?.value === password) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  // Match everything EXCEPT Next.js internals, static files, login, and auth API
  matcher: [
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon\\.ico|login|api/auth).*)",
  ],
};
