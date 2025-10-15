import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = params;
  const db = (await clientPromise).db();
  const biodata = await db.collection("userBiodata").findOne({ _id: new ObjectId(id) });

  if (!biodata) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

  return new Response(JSON.stringify(biodata), { status: 200 });
}