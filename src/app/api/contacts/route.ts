import { NextRequest, NextResponse } from "next/server";

import { ensureConnection } from "@/lib/prisma";
import { sendContactEmail, sendAutoReply } from "@/lib/email";

// GET /api/contacts - List all contacts (admin)
export async function GET(request: NextRequest) {
  try {
    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where = status ? { status } : {};

    const [contacts, total] = await Promise.all([
      db.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.contact.count({ where }),
    ]);

    return NextResponse.json({
      data: contacts,
      pagination: { total, limit, offset, hasMore: offset + limit < total },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

// POST /api/contacts - Submit a new contact/lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message, service, budget, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const contactData = {
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      subject: subject || undefined,
      message: message || undefined,
      service: service || undefined,
      budget: budget || undefined,
      source: source || "website",
    };

    const db = await ensureConnection();
    if (db) {
      await db.contact.create({
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
    } else {
      console.log("[Contact Form] Submission received (no DB):", { name, email, phone, company, subject, message });
    }

    const emailSent = await sendContactEmail(contactData);
    const autoReplySent = await sendAutoReply(contactData);

    return NextResponse.json(
      { data: { name, email, phone, company, subject, message, service, budget, source: source || "website", status: "received" }, emailSent, autoReplySent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 });
  }
}

// PUT /api/contacts - Update a contact (status changes, etc.)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, name, email, phone, company, subject, message, service, budget } = body;

    if (!id) {
      return NextResponse.json({ error: "Contact ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const contact = await db.contact.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(company !== undefined && { company }),
        ...(subject !== undefined && { subject }),
        ...(message !== undefined && { message }),
        ...(service !== undefined && { service }),
        ...(budget !== undefined && { budget }),
      },
    });

    return NextResponse.json({ data: contact });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}

// DELETE /api/contacts - Delete a contact
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Contact ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    await db.contact.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  }
}
