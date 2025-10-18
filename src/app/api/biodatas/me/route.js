import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("Together-ever");

    const biodata = await db.collection("userBiodata").findOne({
      email: session.user.email,
    });

    if (!biodata) {
      return NextResponse.json({ message: "No biodata found" }, { status: 404 });
    }

    biodata._id = biodata._id.toString();

    return NextResponse.json(biodata, { status: 200 });
  } catch (err) {
    console.error("Error fetching biodata:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
