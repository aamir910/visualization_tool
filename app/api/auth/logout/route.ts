// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  // Prepare response
  console.log("Logging out user...");
  const response = NextResponse.json({ success: true });

  // Always clear cookies in response
  response.cookies.set("supabase-access-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // expire immediately
    path: "/",
  });

  response.cookies.set("supabase-refresh-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
      path: "/",
    });

    response.cookies.set("user-name", "", {
      expires: new Date(0),
      path: "/",
    });

    // If you want to sign out from Supabase as well
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Supabase doesn't need the access token here; it will clear sessions
      await supabase.auth.signOut({ scope: "global" });
    }

    return response;
  }
