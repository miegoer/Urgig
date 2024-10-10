import { TextEncoder, TextDecoder } from "util";

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder; // If you also need TextDecoder

//-----------------------------------------------
// MongoMemoryServer and mongoose setup for tests
//-----------------------------------------------
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create(); // Start in-memory MongoDB instance
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri; // Mock the MONGODB_URI to use the in-memory MongoDB
  await mongoose.connect(uri); // Connect to the in-memory MongoDB
});

afterAll(async () => {
  await mongoose.disconnect(); // Disconnect from the in-memory MongoDB
  await mongoServer.stop(); // Stop the in-memory MongoDB instance
});
