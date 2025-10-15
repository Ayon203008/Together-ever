import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("Together-ever");
    const { name, email, password, profileImage } = await req.json();

    if (!name || !email || !password || !profileImage) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const existingUser = await db.collection("user").findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already registered" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      profileImage,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
