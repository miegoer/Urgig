import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { Types } from "mongoose"; 
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
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("userId") || ""; // Get the 'userId' query parameter, default to an empty string

    // let query = {};

    // // If searchQuery is provided, convert to ObjectId and filter bookings
    // if (searchQuery) {
    //   let userIdObjectId;
    //   try {
    //     userIdObjectId = new Types.ObjectId(searchQuery); // Convert string to ObjectId
    //   } catch (error) {
    //     // If conversion fails, return an error response
    //     return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
    //   }

    //   // Build query for bookings
    //   query = {
    //     $or: [
    //       { bookingArtistId: userIdObjectId }, // Match bookingArtistId as ObjectId
    //       { bookingPromoterId: userIdObjectId }, // Match bookingPromoterId as ObjectId
    //     ],
    //   };
    // }
    
    // Filter bookings by user id if provided
    const query = searchQuery
      ? {
          $or: [
            { bookingArtistId: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in bookingArtist_id
            { bookingPromoterId: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in event_id
          ],
        }
      : {}; // If no search query, return all bookings

    // Fetch all bookings
    const bookings = await BookingModel.find(query);

    // Return the bookings with only the selected fields
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
