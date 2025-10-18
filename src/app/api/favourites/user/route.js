import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("Together-ever");
    const favourites = await db
      .collection("favourites")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    // Fetch full biodata info
    const biodataIds = favourites.map(f => f.biodataId);
    const biodatas = await db
      .collection("userBiodata")
      .find({ _id: { $in: biodataIds } })
      .toArray();

    // Convert _id to string
    const formatted = biodatas.map(b => ({ ...b, _id: b._id.toString() }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch favourites" }, { status: 500 });
  }
}
