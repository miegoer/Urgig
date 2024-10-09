import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { UserModel } from "../models/userModel";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Mongoose Schema validation", () => {
  it("should save a valid user", async () => {
    const validUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: "user@example.com",
      typeOfAccount: "standard",
      password: "securepassword",
    });

    const savedUser = await validUser.save();
    expect(savedUser._id).toBe(validUser._id);
    expect(savedUser.email).toBe("user@example.com");
  });

  it("should not save a user without a required email", async () => {
    const invalidUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      typeOfAccount: "standard",
    });

    await expect(invalidUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it("should not allow invalid email format", async () => {
    const invalidUser = new UserModel({
      _id: "user123",
      email: "invalid-email",
      typeOfAccount: "standard",
      password: "securepassword",
    });

    await expect(invalidUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });
});
