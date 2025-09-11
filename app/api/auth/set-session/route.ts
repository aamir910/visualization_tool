import { NextResponse } from "next/server";
import { z } from "zod";

const sessionSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_at: z.number(),
  name: z.string(), // ✅ added name
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body, "here is the body");

    const { access_token, refresh_token, expires_at, name } =
      sessionSchema.parse(body);

    const response = NextResponse.json({ success: true });

    const maxAge = expires_at - Math.floor(Date.now() / 1000);

    // Set cookies with secure attributes
    response.cookies.set("supabase-access-token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge,
    });

    response.cookies.set("supabase-refresh-token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge,
    });

    // ✅ Store name in cookie (not HttpOnly, so frontend can read it if needed)
    response.cookies.set("user-name", name, {
      httpOnly: false, // so frontend can read it
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
