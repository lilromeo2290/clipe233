import { NextRequest, NextResponse } from "next/server";

import { ensureConnection } from "@/lib/prisma";
import { getServices } from "@/lib/strapi";

// GET /api/services - List services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get("admin") === "true";

    if (!admin) {
      const strapiResult = await getServices();
      if (!strapiResult.error && strapiResult.data) {
        return NextResponse.json({ data: strapiResult.data });
      }
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ data: [] });
    }

    const where = admin ? {} : { published: true };
    const services = await db.service.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ data: services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST /api/services - Create a service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, icon, features, benefits, order, published } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const existing = await db.service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "A service with this slug already exists" }, { status: 409 });
    }

    const service = await db.service.create({
      data: {
        title,
        slug,
        description: description || null,
        icon: icon || null,
        features: features || null,
        benefits: benefits || null,
        order: order ?? 0,
        published: published ?? true,
      },
    });

    return NextResponse.json({ data: service }, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

// PUT /api/services - Update a service
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, slug, description, icon, features, benefits, order, published } = body;

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const service = await db.service.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(features !== undefined && { features }),
        ...(benefits !== undefined && { benefits }),
        ...(order !== undefined && { order }),
        ...(published !== undefined && { published }),
      },
    });

    return NextResponse.json({ data: service });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE /api/services - Delete a service
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    await db.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
