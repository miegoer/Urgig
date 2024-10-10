// import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { UserModel } from "@/app/lib/mongoDB/models/userModel";
import { UserZodSchema } from "@/app/lib/zodSchemas/userZodSchema";
import { NextRequest, NextResponse } from "next/server";

//create new user
export async function POST(request: NextRequest) {
  const dbConnect = (await import("@/app/lib/mongoDB/dbConnect")).default;
  await dbConnect(); // Ensure database connection is established

  const user = await request.json();
  const validation = UserZodSchema.safeParse(user);
  //check if submited data is OK
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });
  try {
    // Attempt to create a new user
    const newUser = await UserModel.create(validation.data);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      const mongoError = error as { code?: number }; //casting into mongoError to recognize .code is number code
      console.log("mongoerror", mongoError);
      if (mongoError.code === 11000) {
        //MongoDB error code for duplicate key
        return NextResponse.json({ error: "Duplicate Key!" }, { status: 409 });
      } else {
        // Handle other errors
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
    } else {
      // Handle unexpected error types
      console.error("Unexpected error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}

//get all users main data (_id, email, name)
export async function GET(request: NextRequest) {
  const dbConnect = (await import("@/app/lib/mongoDB/dbConnect")).default;

  await dbConnect(); // Ensure database connection is established

  try {
    // Fetch all users, selecting only the _id, name, and email fields, excluding everything else
    const users = await UserModel.find().select("_id name email");

    // Return the users with only the selected fields
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
