import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { UserModel } from "@/app/lib/mongoDB/models/userModel";
import { EventZodSchema } from "@/app/lib/zodSchemas/eventZodSchema";
import { NextRequest, NextResponse } from "next/server";


//get all artists
export async function GET(request: NextRequest) {
  //we need request here to prevent caching data
  await dbConnect(); // Ensure database connection is established
  try {
    // Fetch all events
    const artists = await UserModel.find({ typeOfAccount: "artist" })
    // Return the events with only the selected fields
    return NextResponse.json(artists, { status: 200 });
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
