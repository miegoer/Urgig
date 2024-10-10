import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { UserModel } from "@/app/lib/mongoDB/models/userModel";
import { UserZodSchema } from "@/app/lib/zodSchemas/userZodSchema";
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

//get specific user's all info
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const UserIdZodSchema = UserZodSchema.pick({ _id: true });

  try {
    const validatedUserId = UserIdZodSchema.parse({ _id: params.id });
    await dbConnect(); // Ensure database connection is established
    const user = await UserModel.findById(params.id).select("-password");

    //if not found return 404
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    // else return data
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Failed to get user by id:", error);
    throw new Error("Failed to get user by id from DB");
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    //validate the request body
    const bodyUser = await request.json();

    const PartialUserZodSchema = UserZodSchema.partial();
    const validatedUser = PartialUserZodSchema.parse(bodyUser);

    await dbConnect(); // Ensure database connection is established
    // fetch user with the given id
    const user = await UserModel.findById(params.id).select("-password");

    // if doesn't exit -> return 404
    if (!user) return NextResponse.json({ error: "user not found PATCH" }, { status: 404 });

    // Update the user's fields directly on the document
    Object.assign(user, validatedUser);

    // update the user
    await user.save();

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error updating user PATCH", error);
    return NextResponse.json({ error: "Failed to update user PATCH" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const UserIdZodSchema = UserZodSchema.pick({ _id: true });
    const validatedUserId = UserIdZodSchema.parse({ _id: params.id });

    await dbConnect(); // Ensure database connection is established
    // Fetch the user by ID before deletion
    const user = await UserModel.findById(params.id).select("-password");

    // If the user does not exist, return 404
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Delete the user by ID
    const result = await UserModel.deleteOne({ _id: validatedUserId });

    // Check if a document was deleted
    if (result.deletedCount === 0)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Return the deleted user
    // ! TODO -> need to call funcation that will delete all of other user's files as well!
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GETHelper(userId: string, field: string) {
  await dbConnect(); // Ensure database connection is established
  const user = await UserModel.findById(userId).select(field).populate(field);

  //if not found return 404
  // else return data
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user, { status: 200 });
}
