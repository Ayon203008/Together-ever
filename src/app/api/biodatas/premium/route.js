// GET /api/biodatas/premium
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Together-ever");

    const biodatas = await db
      .collection("userBiodata")
      .find({ isPremium: true })
      .sort({ name: 1 })
      .limit(6) // 👈 Only 6 premium members
      .toArray();

    const formatted = biodatas.map((bio) => ({
      ...bio,
      _id: bio._id.toString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch premium biodatas" },
      { status: 500 }
    );
  }
}
