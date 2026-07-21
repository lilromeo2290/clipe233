import { NextRequest, NextResponse } from "next/server";


// POST /api/auth/login - Verify admin credentials
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "clipe233@2025";

    if (username === validUsername && password === validPassword) {
      // Simple token - in production you'd use JWT or sessions
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");
      return NextResponse.json({
        success: true,
        token,
        user: { username, role: "admin" },
      });
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
