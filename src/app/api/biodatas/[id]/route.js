import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Together-ever");
    const biodata = await db
      .collection("userBiodata")
      .findOne({ _id: new ObjectId(id) });

    if (!biodata) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Convert _id to string
    biodata._id = biodata._id.toString();

    return NextResponse.json(biodata, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch biodata" }, { status: 500 });
  }
}
