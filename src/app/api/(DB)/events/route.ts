import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { EventModel } from "@/app/lib/mongoDB/models/eventModel";
import { EventZodSchema } from "@/app/lib/zodSchemas/eventZodSchema";
import { NextRequest, NextResponse } from "next/server";

//create new event
export async function POST(request: NextRequest) {
  await dbConnect(); // Ensure database connection is established
  const event = await request.json();
  const validation = EventZodSchema.safeParse(event);
  //check if submited data is OK
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });
  try {
    // Attempt to create a new event
    const newEvent = await EventModel.create(validation.data);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      const mongoError = error as { code?: number }; //casting into mongoError to recognize .code is number code
      console.log("mongoerror", mongoError);
      if (mongoError.code === 11000) {
        //MongoDB error code for duplicate key
        return NextResponse.json({ error: "Duplicate Key!" }, { status: 409 });
      } else {
        // Handle other errors
        console.error("Error creating event:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
    } else {
      // Handle unexpected error types
      console.error("Unexpected error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}

//get all events main data (_id, email, name)
export async function GET(request: NextRequest) {
  //we need request here to prevent caching data
  await dbConnect(); // Ensure database connection is established

  try {
    // Fetch all events
    const events = await EventModel.find();

    // Return the events with only the selected fields
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
