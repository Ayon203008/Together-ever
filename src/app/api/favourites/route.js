import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { biodataId, userId } = await req.json();

    if (!biodataId || !ObjectId.isValid(biodataId) || !userId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Together-ever");
    const collection = db.collection("favourites");

    // Check if already added
    const exists = await collection.findOne({ biodataId: new ObjectId(biodataId), userId });
    if (exists) {
      return NextResponse.json({ message: "Already in favourites" }, { status: 200 });
    }

    await collection.insertOne({
      biodataId: new ObjectId(biodataId),
      userId,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Added to favourites ❤️" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add favourite" }, { status: 500 });
  }
}





export async function DELETE(req) {
  try {
    const { biodataId, userId } = await req.json();
    if (!biodataId || !userId) return NextResponse.json({ error: "Missing data" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("Together-ever");
    await db.collection("favourites").deleteOne({
      biodataId: new ObjectId(biodataId),
      userId,
    });

    return NextResponse.json({ message: "Favourite removed successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete favourite" }, { status: 500 });
  }
}
