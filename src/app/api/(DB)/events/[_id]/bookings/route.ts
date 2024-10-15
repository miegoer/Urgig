import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { EventModel } from "@/app/lib/mongoDB/models/eventModel";
import { BookingModel } from "@/app/lib/mongoDB/models/bookingModel";

//function that returns an array with bookings (the whole object) from the Event
export async function GET(request: NextRequest, { params }: { params: { _id: string } }) {
  await dbConnect();
  const event = await EventModel.findById(params._id);
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
  if (!event.bookingIds || event.bookingIds.length === 0) {
    return NextResponse.json({ error: `No bookingIds found for this event` }, { status: 404 });
  }
  const bookings = await BookingModel.find({ _id: { $in: event.bookingIds } });
  return NextResponse.json(bookings, { status: 200 });
}