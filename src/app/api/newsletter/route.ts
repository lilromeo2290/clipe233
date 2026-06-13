import { NextRequest, NextResponse } from "next/server";
import { ensureConnection } from "@/lib/prisma";

// GET /api/newsletter - List subscribers (admin)
export async function GET() {
  try {
    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ data: [] });
    }

    const subscribers = await db.newsletterSubscriber.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: subscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      console.log("[Newsletter] Subscription received (no DB):", { email, source });
      return NextResponse.json({ data: { email, source: source || "website", active: true } }, { status: 201 });
    }

    const subscriber = await db.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true },
      create: { email, source: source || "website", active: true },
    });

    return NextResponse.json({ data: subscriber }, { status: 201 });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

// DELETE /api/newsletter - Remove a subscriber
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Subscriber ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    await db.newsletterSubscriber.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return NextResponse.json({ error: "Failed to delete subscriber" }, { status: 500 });
  }
}
