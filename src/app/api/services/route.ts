import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServices } from "@/lib/strapi";

// GET /api/services - List services
export async function GET() {
  try {
    // Try Strapi first
    const strapiResult = await getServices();
    if (!strapiResult.error && strapiResult.data) {
      return NextResponse.json({ data: strapiResult.data });
    }

    // Local database fallback
    const services = await prisma.service.findMany({
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
