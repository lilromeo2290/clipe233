import { NextRequest, NextResponse } from "next/server";
import { ensureConnection } from "@/lib/prisma";
import { getTeamMembers } from "@/lib/strapi";

// GET /api/team - List team members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get("admin") === "true";

    // Try Strapi first
    if (!admin) {
      const strapiResult = await getTeamMembers();
      if (!strapiResult.error && strapiResult.data) {
        return NextResponse.json({ data: strapiResult.data });
      }
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ data: [] });
    }

    const where = admin ? {} : { published: true };
    const team = await db.teamMember.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ data: team });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

// POST /api/team - Create a team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, title, bio, image, expertise, qualifications, technicalSkills, order, published } = body;

    if (!name || !title) {
      return NextResponse.json({ error: "Name and title are required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const member = await db.teamMember.create({
      data: {
        name,
        title,
        bio: bio || null,
        image: image || null,
        expertise: expertise || null,
        qualifications: qualifications || null,
        technicalSkills: technicalSkills || null,
        order: order ?? 0,
        published: published ?? true,
      },
    });

    return NextResponse.json({ data: member }, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}

// PUT /api/team - Update a team member
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, title, bio, image, expertise, qualifications, technicalSkills, order, published } = body;

    if (!id) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const member = await db.teamMember.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(title !== undefined && { title }),
        ...(bio !== undefined && { bio }),
        ...(image !== undefined && { image }),
        ...(expertise !== undefined && { expertise }),
        ...(qualifications !== undefined && { qualifications }),
        ...(technicalSkills !== undefined && { technicalSkills }),
        ...(order !== undefined && { order }),
        ...(published !== undefined && { published }),
      },
    });

    return NextResponse.json({ data: member });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

// DELETE /api/team - Delete a team member
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    const db = await ensureConnection();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    await db.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
