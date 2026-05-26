import { NextResponse } from "next/server";
import { isDbAvailable, prisma } from "@/lib/prisma";
import { getTeamMembers } from "@/lib/strapi";

// GET /api/team - List team members
export async function GET() {
  try {
    // Try Strapi first
    const strapiResult = await getTeamMembers();
    if (!strapiResult.error && strapiResult.data) {
      return NextResponse.json({ data: strapiResult.data });
    }

    if (!isDbAvailable()) {
      return NextResponse.json({ data: [] });
    }

    // Local database fallback
    const team = await prisma!.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ data: team });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}
