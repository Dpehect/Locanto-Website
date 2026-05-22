import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const savedListings = new Set<string>();

export async function GET() {
  return NextResponse.json({ ids: Array.from(savedListings) });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { id?: string; saved?: boolean };

  if (!body.id) {
    return NextResponse.json(
      { message: "A listing id is required." },
      { status: 400 },
    );
  }

  if (body.saved) {
    savedListings.add(body.id);
  } else {
    savedListings.delete(body.id);
  }

  return NextResponse.json({ ids: Array.from(savedListings) });
}
