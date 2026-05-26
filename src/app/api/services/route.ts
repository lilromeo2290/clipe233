import { NextResponse } from "next/server";
import { ensureConnection } from "@/lib/prisma";
import { getServices } from "@/lib/strapi";

// GET /api/services - List services
export async function GET() {
  try {
    // Try Strapi first
    const strapiResult = await getServices();
    if (!strapiResult.error && strapiResult.data) {
      return NextResponse.json({ data: strapiResult.data });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ data: [] });
    }

    // Local database fallback
    const services = await db.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ data: services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
