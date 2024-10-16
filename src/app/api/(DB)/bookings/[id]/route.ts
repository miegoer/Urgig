import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { BookingModel } from "@/app/lib/mongoDB/models/bookingModel";
import { BookingZodSchema } from "@/app/lib/zodSchemas/bookingZodSchema";
import { Booking } from "@/types/booking";
import { NextRequest, NextResponse } from "next/server";

//get specific booking's all info
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const BookingIdZodSchema = BookingZodSchema.pick({ _id: true });
  const validatedBookingId = BookingIdZodSchema.parse({ id: params.id });

  try {
    await dbConnect(); // Ensure database connection is established
    const booking = await BookingModel.findById(params.id);

    //if not found return 404
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    // else return data
    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("Failed to get booking by id:", error);
    throw new Error("Failed to get booking by id from DB");
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    //validate the request body
    const bodyBooking = await request.json();

    const PartialBookingZodSchema = BookingZodSchema.partial();
    const validatedBooking = PartialBookingZodSchema.parse(bodyBooking);

    await dbConnect(); // Ensure database connection is established
    // fetch booking with the given id
    const booking = await BookingModel.findById(params.id);

    // if doesn't exit -> return 404
    if (!booking) return NextResponse.json({ error: "booking not found PATCH" }, { status: 404 });

    // Update the booking's fields directly on the document
    Object.assign(booking, validatedBooking);

    // update the booking
    await booking.save();

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error updating booking PATCH", error);
    return NextResponse.json({ error: "Failed to update booking PATCH" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const BookingIdZodSchema = BookingZodSchema.pick({ _id: true });
    const validatedBookingId = BookingIdZodSchema.parse({ id: params.id });

    await dbConnect(); // Ensure database connection is established
    // Fetch the booking by ID before deletion
    const booking = await BookingModel.findById(params.id);

    // If the booking does not exist, return 404
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    // Delete the booking by ID
    const result = await BookingModel.deleteOne({ id: validatedBookingId });

    // Check if a document was deleted
    if (result.deletedCount === 0)
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    // Return the deleted booking
    // ! TODO -> need to call funcation that will delete all of other booking's files as well!
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
