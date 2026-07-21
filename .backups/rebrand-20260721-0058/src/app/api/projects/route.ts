import { NextRequest, NextResponse } from "next/server";

import { ensureConnection } from "@/lib/prisma";
import { getProjects, getProject } from "@/lib/strapi";

// GET /api/projects - List projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.get("featured") === "true" ? true : undefined;
    const source = searchParams.get("source") || "local";
    const admin = searchParams.get("admin") === "true";

    if (slug) {
      if (source === "strapi") {
        const result = await getProject(slug);
        if (result.error) {
          return NextResponse.json({ error: result.error.message }, { status: result.error.status });
        }
        return NextResponse.json({ data: result.data });
      }

      const db = await ensureConnection();
      if (!db) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }

      const project = await db.project.findUnique({ where: { slug } });
      if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json({ data: project });
    }

    if (source === "strapi") {
      const result = await getProjects({ page, pageSize, category, featured });
      if (!result.error) {
        return NextResponse.json({ data: result.data, meta: result.meta });
      }
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({
        data: [],
        pagination: { page, pageSize, total: 0, pageCount: 0 },
      });
    }

    const where = {
      ...(admin ? {} : { published: true }),
      ...(category ? { category } : {}),
      ...(featured !== undefined ? { featured } : {}),
    };

    const [projects, total] = await Promise.all([
      db.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.project.count({ where }),
    ]);

    return NextResponse.json({
      data: projects,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, content, coverImage, images, category, client, technologies, liveUrl, githubUrl, featured, published, startDate, endDate } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const existing = await db.project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 });
    }

    const project = await db.project.create({
      data: {
        title,
        slug,
        description: description || null,
        content: content || null,
        coverImage: coverImage || null,
        images: images || null,
        category: category || null,
        client: client || null,
        technologies: technologies || null,
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        featured: featured ?? false,
        published: published ?? false,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

// PUT /api/projects - Update a project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, slug, description, content, coverImage, images, category, client, technologies, liveUrl, githubUrl, featured, published, startDate, endDate } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const existing = await db.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = await db.project.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(coverImage !== undefined && { coverImage }),
        ...(images !== undefined && { images }),
        ...(category !== undefined && { category }),
        ...(client !== undefined && { client }),
        ...(technologies !== undefined && { technologies }),
        ...(liveUrl !== undefined && { liveUrl }),
        ...(githubUrl !== undefined && { githubUrl }),
        ...(featured !== undefined && { featured }),
        ...(published !== undefined && { published }),
        ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
      },
    });

    return NextResponse.json({ data: project });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// DELETE /api/projects - Delete a project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
