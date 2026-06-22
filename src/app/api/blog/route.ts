import { NextRequest, NextResponse } from "next/server";

// Force static export for shared hosting deployment
export const dynamic = "force-static";
import { ensureConnection } from "@/lib/prisma";
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
    const admin = searchParams.get("admin") === "true";

    if (slug) {
      if (source === "strapi") {
        const result = await getBlogPost(slug);
        if (result.error) {
          return NextResponse.json({ error: result.error.message }, { status: result.error.status });
        }
        return NextResponse.json({ data: result.data });
      }

      const db = await ensureConnection();
      if (!db) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      const post = await db.post.findUnique({
        where: { slug },
        include: { author: { select: { id: true, name: true, email: true, avatar: true } } },
      });

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json({ data: post });
    }

    if (source === "strapi") {
      const result = await getBlogPosts({ page, pageSize, category, featured });
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

    const [posts, total] = await Promise.all([
      db.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: { author: { select: { id: true, name: true, avatar: true } } },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.post.count({ where }),
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

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, category, tags, published, featured, authorId } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    // Check slug uniqueness
    const existing = await db.post.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
    }

    const post = await db.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content: content || null,
        coverImage: coverImage || null,
        category: category || null,
        tags: tags || null,
        published: published ?? false,
        featured: featured ?? false,
        authorId: authorId || "admin",
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}

// PUT /api/blog - Update a blog post
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, slug, excerpt, content, coverImage, category, tags, published, featured } = body;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const existing = await db.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check slug uniqueness if changing
    if (slug && slug !== existing.slug) {
      const slugConflict = await db.post.findUnique({ where: { slug } });
      if (slugConflict) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
      }
    }

    const post = await db.post.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content !== undefined && { content }),
        ...(coverImage !== undefined && { coverImage }),
        ...(category !== undefined && { category }),
        ...(tags !== undefined && { tags }),
        ...(published !== undefined && { published, publishedAt: published && !existing.publishedAt ? new Date() : existing.publishedAt }),
        ...(featured !== undefined && { featured }),
      },
    });

    return NextResponse.json({ data: post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

// DELETE /api/blog - Delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    await db.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
