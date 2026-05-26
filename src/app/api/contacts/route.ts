import { NextRequest, NextResponse } from "next/server";
import { isDbAvailable, prisma } from "@/lib/prisma";

// GET /api/contacts - List all contacts (admin)
export async function GET(request: NextRequest) {
  try {
    if (!isDbAvailable()) {
      return NextResponse.json({ data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where = status ? { status } : {};

    const [contacts, total] = await Promise.all([
      prisma!.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma!.contact.count({ where }),
    ]);

    return NextResponse.json({
      data: contacts,
      pagination: { total, limit, offset, hasMore: offset + limit < total },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// POST /api/contacts - Submit a new contact/lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message, service, budget, source } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!isDbAvailable()) {
      // Accept the submission but store it in memory / log it
      console.log("[Contact Form] Submission received (no DB):", { name, email, phone, company, subject, message });
      return NextResponse.json(
        { data: { name, email, phone, company, subject, message, service, budget, source: source || "website", status: "received" }, note: "Saved — database not connected, submission logged." },
        { status: 201 }
      );
    }

    const contact = await prisma!.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject: subject || null,
        message: message || null,
        service: service || null,
        budget: budget || null,
        source: source || "website",
        status: "new",
      },
    });

    return NextResponse.json({ data: contact }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Failed to submit contact" },
      { status: 500 }
    );
  }
}
