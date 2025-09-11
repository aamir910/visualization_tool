import { NextResponse } from "next/server";
import { z } from "zod";

const sessionSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_at: z.number(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { access_token, refresh_token, expires_at } = sessionSchema.parse(body);

    const response = NextResponse.json({ success: true });

    // Set cookies with secure attributes
    response.cookies.set("supabase-access-token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: expires_at - Math.floor(Date.now() / 1000), // Set expiry based on Supabase token
    });

    response.cookies.set("supabase-refresh-token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: expires_at - Math.floor(Date.now() / 1000),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}