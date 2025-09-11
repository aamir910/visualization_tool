import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  const publicRoutes = ["/login", "/register", "/api/auth/login", "/api/auth/set-session"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for access token in cookies
  const accessToken = request.cookies.get("supabase-access-token")?.value;

  if (!accessToken) {
    // Redirect to login if no access token is found
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Optionally verify the token with Supabase (requires Supabase client)
  // For simplicity, we're assuming the presence of the token is sufficient
  // In a production app, verify the token with Supabase API

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
};