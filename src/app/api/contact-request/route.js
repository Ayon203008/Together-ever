import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { biodataId, email, cardId } = await req.json();

    if (!biodataId || !email || !cardId) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("Together-ever");
    const collection = db.collection("contactRequests");

    await collection.insertOne({
      biodataId,
      email,
      cardId,
      createdAt: new Date(),
      status: "pending",
    });

    return new Response(JSON.stringify({ message: "Request submitted successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to submit request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
