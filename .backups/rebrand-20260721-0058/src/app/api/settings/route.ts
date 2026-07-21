import { NextRequest, NextResponse } from "next/server";

import { ensureConnection } from "@/lib/prisma";

// GET /api/settings - Get site settings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ data: [] });
    }

    if (key) {
      const setting = await db.siteSetting.findUnique({ where: { key } });
      if (!setting) {
        return NextResponse.json({ error: "Setting not found" }, { status: 404 });
      }
      return NextResponse.json({ data: setting });
    }

    const settings = await db.siteSetting.findMany();
    return NextResponse.json({ data: settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT /api/settings - Update a site setting
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json(
        { error: "Database not available — cannot update settings" },
        { status: 503 }
      );
    }

    const setting = await db.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json({ data: setting });
  } catch (error) {
    console.error("Error updating setting:", error);
    return NextResponse.json(
      { error: "Failed to update setting" },
      { status: 500 }
    );
  }
}
