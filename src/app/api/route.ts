import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "healthy",
      service: "Clipe233 Engineers API",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      services: {
        database: "connected",
        supabase: process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project")
          ? "not_configured"
          : "configured",
        strapi: process.env.NEXT_PUBLIC_STRAPI_URL?.includes("your-strapi-instance")
          ? "not_configured"
          : "configured",
      },
      endpoints: {
        contacts: "/api/contacts",
        blog: "/api/blog",
        projects: "/api/projects",
        newsletter: "/api/newsletter",
        careers: "/api/careers",
        team: "/api/team",
        services: "/api/services",
        testimonials: "/api/testimonials",
        settings: "/api/settings",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "degraded",
        service: "Clipe233 Engineers API",
        error: "Database connection failed",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
