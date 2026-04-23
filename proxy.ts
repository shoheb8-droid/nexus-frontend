import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: renamed from middleware.ts → proxy.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow login page and auth API through
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
  matcher: [
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon\\.ico|login|api/auth).*)",
  ],
};
