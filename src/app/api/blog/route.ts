import { NextRequest, NextResponse } from "next/server";
import { isDbAvailable, prisma } from "@/lib/prisma";
import { getBlogPosts, getBlogPost } from "@/lib/strapi";

// GET /api/blog - List blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.get("featured") === "true" ? true : undefined;
    const source = searchParams.get("source") || "local";

    // If slug is provided, get a single post
    if (slug) {
      if (source === "strapi") {
        const result = await getBlogPost(slug);
        if (result.error) {
          return NextResponse.json({ error: result.error.message }, { status: result.error.status });
        }
        return NextResponse.json({ data: result.data });
      }

      if (!isDbAvailable()) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      const post = await prisma!.post.findUnique({
        where: { slug },
        include: { author: { select: { id: true, name: true, email: true, avatar: true } } },
      });

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json({ data: post });
    }

    // Try Strapi first, fall back to local DB
    if (source === "strapi") {
      const result = await getBlogPosts({ page, pageSize, category, featured });
      if (!result.error) {
        return NextResponse.json({ data: result.data, meta: result.meta });
      }
    }

    // Local database query
    if (!isDbAvailable()) {
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

    const [posts, total] = await Promise.all([
      prisma!.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: { author: { select: { id: true, name: true, avatar: true } } },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma!.post.count({ where }),
    ]);

    return NextResponse.json({
      data: posts,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
