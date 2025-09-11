import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { cookies } = await import("next/headers");
  const name = (await cookies()).get("user-name")?.value;
// Assuming 'cookies()' returns an object with a 'getAll()' method
const allCookies = await cookies().getAll(); 
console.log(allCookies); 
  if (!name) {
    console.log(name ,"here is the name")
    return NextResponse.json({ error: "No user data found" }, { status: 401 });
  }

  return NextResponse.json({ name });
}