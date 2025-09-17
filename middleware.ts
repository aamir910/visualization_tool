// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Allow public routes
  const publicRoutes = ["/login", "/register", "/api/auth/login", "/api/auth/set-session", "/api/auth/logout"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ Read access token from cookies
  const accessToken = request.cookies.get("supabase-access-token")?.value;

  if (!accessToken) {
    console.log("No access token → redirecting to login");

    // Redirect to /login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Token exists, allow request
  return NextResponse.next();
}

export const config = {
  matcher: ["/" , "/dashboard/:path*", "/api/protected/:path*"],
};
