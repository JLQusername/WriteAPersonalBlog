import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db: null | ReturnType<MongoClient['db']> = null;

export async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db("blog"); 
  }
  return db;
}
