import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const correct = process.env.ACCESS_PASSWORD || "pfect2025";

  if (password === correct) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("pfect-access", correct, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
}
