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
      published: true,
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
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
