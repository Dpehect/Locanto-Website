import { NextRequest, NextResponse } from "next/server";
import { listings as seedListings, type Listing } from "@/data/classifieds";

export const runtime = "nodejs";

const serverListings: Listing[] = [...seedListings];

function includesValue(value: string, query: string) {
  return value.toLowerCase().includes(query.toLowerCase());
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() ?? "";
  const category = searchParams.get("category") ?? "All categories";
  const city = searchParams.get("city") ?? "United States";
  const imagesOnly = searchParams.get("imagesOnly") === "true";

  const results = serverListings.filter((listing) => {
    const matchesQuery =
      !query ||
      includesValue(listing.title, query) ||
      includesValue(listing.description, query) ||
      includesValue(listing.category, query) ||
      includesValue(listing.city, query);

    const matchesCategory =
      category === "All categories" || listing.category === category;
    const matchesCity = city === "United States" || listing.city === city;
    const matchesImages = !imagesOnly || listing.images.length > 0;

    return matchesQuery && matchesCategory && matchesCity && matchesImages;
  });

  return NextResponse.json({
    total: results.length,
    results,
    generatedAt: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<Listing>;
  const title = body.title?.trim();
  const category = body.category?.trim();
  const city = body.city?.trim();
  const description = body.description?.trim();

  if (!title || !category || !city || !description) {
    return NextResponse.json(
      { message: "Title, category, city, and description are required." },
      { status: 400 },
    );
  }

  const listing: Listing = {
    id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
    title,
    category,
    city,
    description,
    images: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 1,
    posted: "Just now",
    verified: false,
    premium: false,
    tag: "New",
  };

  serverListings.unshift(listing);

  return NextResponse.json({ listing }, { status: 201 });
}
