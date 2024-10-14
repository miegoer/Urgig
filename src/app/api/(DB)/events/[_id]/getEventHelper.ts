import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { EventModel } from "@/app/lib/mongoDB/models/eventModel";
import { NextResponse } from "next/server";

export async function GETHelper(eventId: string, field: string) {
  await dbConnect(); // Ensure database connection is established
  const event = await EventModel.findById(eventId).select(field).populate(field)

  //if not found return 404
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

  if (!event[field])
    return NextResponse.json({ error: `Event.${field} not found` }, { status: 404 });

  return NextResponse.json(event[field], { status: 201 });
}
