import { MongoClient, Db } from "mongodb";

let db: Db;

export const connectMongo = async () => {
  const client = new MongoClient(process.env.MONGO_URL!);
  await client.connect();

  db = client.db(process.env.MONGO_DB_NAME!);
};

export const getDb = (): Db => {
  if (!db) {
    throw new Error("MongoDB not connected");
  }
  return db;
};
