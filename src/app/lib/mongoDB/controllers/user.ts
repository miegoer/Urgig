import { User } from "@/types/user";
import dbConnect from "../dbConnect";
import { UserModel } from "../models/userModel";
import { UserZodSchema } from "../../zodSchemas/userSchema";

export async function addUser(user: User) {
  try {
    const validatedUser = UserZodSchema.parse(user);

    await dbConnect(); // Ensure database connection is established

    const newUser = await UserModel.create({ ...validatedUser });
    return newUser;
  } catch (error) {
    console.error("Failed to add user:", error);
    throw new Error("Failed to add user to DB");
  }
}
