import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, image, description } = await req.json();

    if (!title || !image || !description) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Together-ever");
    const posts = db.collection("married_posts");

    const newPost = await posts.insertOne({
      userId: session.user.id,
      userName: session.user.name,
      title,
      image,
      description,
      createdAt: new Date(),
    });

    return Response.json({ success: true, post: newPost }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
