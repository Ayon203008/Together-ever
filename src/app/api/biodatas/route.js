// src/app/api/biodatas/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET /api/biodatas
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
