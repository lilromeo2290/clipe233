import { NextRequest, NextResponse } from "next/server";

import { ensureConnection } from "@/lib/prisma";
import { getTestimonials } from "@/lib/strapi";

// GET /api/testimonials - List testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true" ? true : undefined;
    const admin = searchParams.get("admin") === "true";

    if (!admin) {
      const strapiResult = await getTestimonials({ featured });
      if (!strapiResult.error && strapiResult.data) {
        return NextResponse.json({ data: strapiResult.data });
      }
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ data: [] });
    }

    const where = {
      ...(admin ? {} : { published: true }),
      ...(featured !== undefined ? { featured } : {}),
    };

    const testimonials = await db.testimonial.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

// POST /api/testimonials - Create a testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, title, company, avatar, content, rating, featured, published } = body;

    if (!name || !content) {
      return NextResponse.json({ error: "Name and content are required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const testimonial = await db.testimonial.create({
      data: {
        name,
        title: title || null,
        company: company || null,
        avatar: avatar || null,
        content,
        rating: rating || null,
        featured: featured ?? false,
        published: published ?? true,
      },
    });

    return NextResponse.json({ data: testimonial }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

// PUT /api/testimonials - Update a testimonial
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, title, company, avatar, content, rating, featured, published } = body;

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const testimonial = await db.testimonial.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(title !== undefined && { title }),
        ...(company !== undefined && { company }),
        ...(avatar !== undefined && { avatar }),
        ...(content !== undefined && { content }),
        ...(rating !== undefined && { rating }),
        ...(featured !== undefined && { featured }),
        ...(published !== undefined && { published }),
      },
    });

    return NextResponse.json({ data: testimonial });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// DELETE /api/testimonials - Delete a testimonial
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    await db.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
