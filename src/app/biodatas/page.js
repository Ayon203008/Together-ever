// src/app/biodatas/page.js
import clientPromise from "@/lib/mongodb";
import BiodataClient from "./BiodataClient";

export default async function BiodatasPage() {
  const client = await clientPromise;
  const db = client.db("Together-ever");
  const biodatas = await db.collection("userBiodata").find({}).toArray();

  const biodatasWithId = biodatas.map((b) => ({ ...b, _id: b._id.toString() }));

  return <BiodataClient biodatas={biodatasWithId} />;
}
