import { MongoClient, Db, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI || "";

if (!uri && process.env.NODE_ENV !== "production") {
  console.warn("⚠️ MONGODB_URI not found");
}

// ✅ Add explicit TLS/SSL options
const options: MongoClientOptions = {
  // Connection pool
  maxPoolSize: 10,
  minPoolSize: 2,

  // Timeouts
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,

  // ✅ TLS/SSL Configuration
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,

  // Retry configuration
  retryWrites: true,
  retryReads: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Development with global caching
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase(): Promise<Db> {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "baraapp");

    // Test connection
    await db.command({ ping: 1 });
    console.log("✅ MongoDB connection successful");

    return db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}
