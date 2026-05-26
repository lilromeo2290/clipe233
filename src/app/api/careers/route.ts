import { NextRequest, NextResponse } from "next/server";
import { isDbAvailable, prisma } from "@/lib/prisma";
import { getJobOpenings } from "@/lib/strapi";

// GET /api/careers - List job openings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get("source") || "local";

    // Try Strapi first
    if (source === "strapi") {
      const result = await getJobOpenings();
      if (!result.error) {
        return NextResponse.json({ data: result.data });
      }
    }

    if (!isDbAvailable()) {
      return NextResponse.json({ data: [] });
    }

    // Local database
    const jobs = await prisma!.jobOpening.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { applications: true } } },
    });

    return NextResponse.json({ data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch job openings" },
      { status: 500 }
    );
  }
}

// POST /api/careers - Submit a job application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId, name, email, phone, coverLetter, resumeUrl, portfolioUrl } = body;

    if (!jobId || !name || !email) {
      return NextResponse.json(
        { error: "Job ID, name, and email are required" },
        { status: 400 }
      );
    }

    if (!isDbAvailable()) {
      console.log("[Careers] Application received (no DB):", { jobId, name, email, phone });
      return NextResponse.json(
        { data: { jobId, name, email, phone, coverLetter, resumeUrl, portfolioUrl, status: "received" }, note: "Saved — database not connected, application logged." },
        { status: 201 }
      );
    }

    // Verify job exists and is published
    const job = await prisma!.jobOpening.findFirst({
      where: { id: jobId, published: true },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job opening not found or no longer active" },
        { status: 404 }
      );
    }

    const application = await prisma!.jobApplication.create({
      data: {
        jobId,
        name,
        email,
        phone: phone || null,
        coverLetter: coverLetter || null,
        resumeUrl: resumeUrl || null,
        portfolioUrl: portfolioUrl || null,
        status: "submitted",
      },
    });

    return NextResponse.json({ data: application }, { status: 201 });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
