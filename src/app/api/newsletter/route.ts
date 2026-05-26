import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/newsletter - List subscribers (admin)
export async function GET() {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: subscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Upsert to handle duplicates
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true },
      create: {
        email,
        source: source || "website",
        active: true,
      },
    });

    return NextResponse.json({ data: subscriber }, { status: 201 });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
