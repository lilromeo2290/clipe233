import { NextRequest, NextResponse } from "next/server";
import { ensureConnection } from "@/lib/prisma";
import { getJobOpenings } from "@/lib/strapi";

// GET /api/careers - List job openings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get("source") || "local";
    const admin = searchParams.get("admin") === "true";

    if (source === "strapi" && !admin) {
      const result = await getJobOpenings();
      if (!result.error) {
        return NextResponse.json({ data: result.data });
      }
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ data: [] });
    }

    const where = admin ? {} : { published: true };
    const jobs = await db.jobOpening.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { applications: true } } },
    });

    return NextResponse.json({ data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch job openings" }, { status: 500 });
  }
}

// POST /api/careers - Create a job opening OR submit an application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // If jobId is present, this is a job application
    if (body.jobId) {
      const { jobId, name, email, phone, coverLetter, resumeUrl, portfolioUrl } = body;

      if (!jobId || !name || !email) {
        return NextResponse.json({ error: "Job ID, name, and email are required" }, { status: 400 });
      }

      const db = await ensureConnection();
      if (!db) {
        return NextResponse.json({ data: { jobId, name, email, phone, coverLetter, status: "received" } }, { status: 201 });
      }

      const job = await db.jobOpening.findFirst({ where: { id: jobId, published: true } });
      if (!job) {
        return NextResponse.json({ error: "Job opening not found or no longer active" }, { status: 404 });
      }

      const application = await db.jobApplication.create({
        data: { jobId, name, email, phone: phone || null, coverLetter: coverLetter || null, resumeUrl: resumeUrl || null, portfolioUrl: portfolioUrl || null, status: "submitted" },
      });

      return NextResponse.json({ data: application }, { status: 201 });
    }

    // Otherwise, create a new job opening
    const { title, slug, department, location, type, description, requirements, salary, published, deadline } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const existing = await db.jobOpening.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "A job opening with this slug already exists" }, { status: 409 });
    }

    const job = await db.jobOpening.create({
      data: {
        title,
        slug,
        department: department || null,
        location: location || null,
        type: type || null,
        description: description || null,
        requirements: requirements || null,
        salary: salary || null,
        published: published ?? false,
        deadline: deadline ? new Date(deadline) : null,
      },
    });

    return NextResponse.json({ data: job }, { status: 201 });
  } catch (error) {
    console.error("Error with careers POST:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

// PUT /api/careers - Update a job opening
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, slug, department, location, type, description, requirements, salary, published, deadline } = body;

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const job = await db.jobOpening.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(department !== undefined && { department }),
        ...(location !== undefined && { location }),
        ...(type !== undefined && { type }),
        ...(description !== undefined && { description }),
        ...(requirements !== undefined && { requirements }),
        ...(salary !== undefined && { salary }),
        ...(published !== undefined && { published }),
        ...(deadline !== undefined && { deadline: deadline ? new Date(deadline) : null }),
      },
    });

    return NextResponse.json({ data: job });
  } catch (error) {
    console.error("Error updating job opening:", error);
    return NextResponse.json({ error: "Failed to update job opening" }, { status: 500 });
  }
}

// DELETE /api/careers - Delete a job opening
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    await db.jobOpening.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job opening:", error);
    return NextResponse.json({ error: "Failed to delete job opening" }, { status: 500 });
  }
}
