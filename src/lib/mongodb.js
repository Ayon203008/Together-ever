// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Add your MongoDB URI in .env
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env");
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable in dev to preserve connection across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's fine to create new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
