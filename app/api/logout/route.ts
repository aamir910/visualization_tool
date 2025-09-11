import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear all authentication-related cookies
  response.cookies.delete("supabase-access-token");
  response.cookies.delete("supabase-refresh-token");
  response.cookies.delete("user-name");

  // Invalidate Supabase session if access token exists
  const accessToken = (await import("next/headers")).cookies().get("supabase-access-token")?.value;
  if (accessToken) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
      return response; // Return early, cookies are still cleared
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    // Verify the user to get their ID
    const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);
    if (userError || !userData.user) {
      console.error("Failed to verify user:", userError?.message);
      return response; // Return early, cookies are still cleared
    }

    // Sign out all sessions for the user
    const { error } = await supabase.auth.signOut({ scope: "global" });
    if (error) {
      console.error("Supabase signOut error:", error.message);
      // Continue with logout even if Supabase call fails
    }
  }

  return response;
}