import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { POST, GET } from "@/app/api/(DB)/users/route"; // Import your route handlers
import { NextRequest } from "next/server";
import { createMocks } from "node-mocks-http"; // For mocking Next.js request/response objects
import { UserModel } from "@/app/lib/mongoDB/models/userModel";

// MongoMemoryServer setup
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri; // Set the MONGODB_URI to the in-memory MongoDB URI
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean up users after each test
  await UserModel.deleteMany({});
});

describe("User API Routes", () => {
  // ==============================
  // POST Tests (Create a New User)
  // ==============================
  it("should create a new user successfully", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "testuser@example.com",
        typeOfAccount: "standard",
        password: "securepassword",
      },
    });

    // Call the POST route
    const response = await POST(req as unknown as NextRequest);

    // Check the response status and body
    expect(response.status).toBe(201); // Expect success status
    const jsonResponse = await response.json();
    expect(jsonResponse.email).toBe("testuser@example.com");
  });

  it("should return validation error if user data is invalid (Zod validation)", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "invalid-email", // Invalid email
        typeOfAccount: "standard",
        password: "securepassword",
      },
    });

    // Call the POST route
    const response = await POST(req as unknown as NextRequest);

    // Check for validation error (400 status)
    expect(response.status).toBe(400);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: "Invalid email" }), // Ensure Zod validation catches email
      ])
    );
  });

  it("should return conflict error for duplicate email (MongoDB error 11000)", async () => {
    // First create a user with the same email
    await UserModel.create({
      email: "duplicate@example.com",
      typeOfAccount: "standard",
      password: "securepassword",
    });

    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "duplicate@example.com",
        typeOfAccount: "standard",
        password: "securepassword",
      },
    });

    // Call the POST route
    const response = await POST(req as unknown as NextRequest);

    // Check for conflict error (409 status)
    expect(response.status).toBe(409);
    const jsonResponse = await response.json();
    expect(jsonResponse.error).toBe("Duplicate Key!");
  });

  it("should return internal server error if something goes wrong", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "testuser@example.com",
        typeOfAccount: "standard",
        password: "securepassword",
      },
    });

    // Simulate a MongoDB error by mocking the UserModel.create() function
    jest.spyOn(UserModel, "create").mockImplementationOnce(() => {
      throw new Error("Simulated MongoDB Error");
    });

    // Call the POST route
    const response = await POST(req as unknown as NextRequest);

    // Check for server error (500 status)
    expect(response.status).toBe(500);
    const jsonResponse = await response.json();
    expect(jsonResponse.error).toBe("Internal Server Error");
  });

  // ==============================
  // GET Tests (Fetch All Users)
  // ==============================
  it("should fetch all users successfully", async () => {
    // Seed the database with some users
    await UserModel.create([
      { email: "user1@example.com", typeOfAccount: "standard", password: "password1" },
      { email: "user2@example.com", typeOfAccount: "standard", password: "password2" },
    ]);

    const { req, res } = createMocks({
      method: "GET",
    });

    // Call the GET route
    const response = await GET(req as unknown as NextRequest);

    // Check the response status and body
    expect(response.status).toBe(200); // Expect success status
    const users = await response.json();
    expect(users.length).toBe(2);
    expect(users[0].email).toBe("user1@example.com");
    expect(users[1].email).toBe("user2@example.com");
  });

  it("should return empty array when no users exist", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    // Call the GET route when no users are present
    const response = await GET(req as unknown as NextRequest);

    // Check the response status and body
    expect(response.status).toBe(200); // Expect success status
    const users = await response.json();
    expect(users).toEqual([]); // Expect empty array
  });

  it("should return internal server error if something goes wrong while fetching users", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    // Simulate a MongoDB error by mocking the UserModel.find() function
    jest.spyOn(UserModel, "find").mockImplementationOnce(() => {
      throw new Error("Simulated MongoDB Error");
    });

    // Call the GET route
    const response = await GET(req as unknown as NextRequest);

    // Check for server error (500 status)
    expect(response.status).toBe(500);
    const jsonResponse = await response.json();
    expect(jsonResponse.error).toBe("Internal Server Error");
  });
});
