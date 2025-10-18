// src/app/api/biodatas/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET /api/biodatas

// get all the biodatas and show to the All Biodatas page
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Together-ever"); // your DB name
    const biodatas = await db
      .collection("userBiodata")
      .find({})
      .sort({ name: 1 }) // sort by name
      .toArray();

    // Remove _id object or convert to string
    const formatted = biodatas.map((bio) => ({
      ...bio,
      _id: bio._id.toString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch biodatas" }, { status: 500 });
  }
}



// create bio  data and post the biodata to all biodata
export async function POST(req) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db("Together-ever");
    const collection = db.collection("userBiodata");

    // 1️⃣ Find the last index
    const lastBiodata = await collection
      .find({})
      .sort({ index: -1 }) // descending sort by index
      .limit(1)
      .toArray();

    const nextIndex = lastBiodata.length > 0 ? lastBiodata[0].index + 1 : 1;

    // 2️⃣ Insert new biodata with the auto-generated index
    const newBiodata = {
      ...data,
      index: nextIndex, // auto-incremented index
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newBiodata);

    return NextResponse.json(
      { message: "Biodata created successfully", id: result.insertedId, index: nextIndex },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { error: "Failed to create biodata" },
      { status: 500 }
    );
  }
}
