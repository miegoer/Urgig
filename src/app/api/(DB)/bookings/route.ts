import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { BookingModel } from "@/app/lib/mongoDB/models/bookingModel";
import { BookingZodSchema } from "@/app/lib/zodSchemas/bookingZodSchema";
import { NextRequest, NextResponse } from "next/server";

//create new booking
export async function POST(request: NextRequest) {
  await dbConnect(); // Ensure database connection is established
  const booking = await request.json();
  const validation = BookingZodSchema.safeParse(booking);
  //check if submited data is OK
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });
  try {
    // Attempt to create a new booking
    const newBooking = await BookingModel.create(validation.data);
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      const mongoError = error as { code?: number }; //casting into mongoError to recognize .code is number code
      console.log("mongoerror", mongoError);
      if (mongoError.code === 11000) {
        //MongoDB error code for duplicate key
        return NextResponse.json({ error: "Duplicate Key!" }, { status: 409 });
      } else {
        // Handle other errors
        console.error("Error creating booking:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
    } else {
      // Handle unexpected error types
      console.error("Unexpected error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}

//get all bookings main data (_id, email, name)
export async function GET(request: NextRequest) {
  //we need request here to prbooking caching data
  await dbConnect(); // Ensure database connection is established

  try {
    // Fetch all bookings
    const bookings = await BookingModel.find();

    // Return the bookings with only the selected fields
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
