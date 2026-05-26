import { NextRequest, NextResponse } from "next/server";
import { ensureConnection } from "@/lib/prisma";
import { getTestimonials } from "@/lib/strapi";

// GET /api/testimonials - List testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true" ? true : undefined;

    // Try Strapi first
    const strapiResult = await getTestimonials({ featured });
    if (!strapiResult.error && strapiResult.data) {
      return NextResponse.json({ data: strapiResult.data });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ data: [] });
    }

    // Local database fallback
    const where = {
      published: true,
      ...(featured !== undefined ? { featured } : {}),
    };

    const testimonials = await db.testimonial.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
