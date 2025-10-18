import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password, profileImage } = await req.json();
    const client = await clientPromise;
    const db = client.db("Together-ever");
    const user = db.collection("users");

    // Check if email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user with default role = "user"
    const newUser = await user.insertOne({
      name,
      email,
      password: hashedPassword,
      image: profileImage || null,
      role: "user", // 🔥 Default role set here
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
