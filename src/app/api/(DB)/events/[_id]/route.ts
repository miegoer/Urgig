import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { EventModel } from "@/app/lib/mongoDB/models/eventModel";
import { EventZodSchema } from "@/app/lib/zodSchemas/eventZodSchema";
import { Event } from "@/types/event";
import { NextRequest, NextResponse } from "next/server";

//get specific event's all info
export async function GET(request: NextRequest, { params }: { params: { _id: string } }) {
  const EventIdZodSchema = EventZodSchema.pick({ _id: true });
  const validatedEventId = EventIdZodSchema.parse({ _id: params._id });
  const { _id } = params;
  try {
    await dbConnect(); // Ensure database connection is established
    const event = await EventModel.findById(_id);
    //if not found return 404
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    // else return data
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Failed to get event by _id:", error);
    throw new Error("Failed to get event by _id from DB");
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { _id: string } }) {
  try {
    //validate the request body
    const bodyEvent = await request.json();

    const PartialEventZodSchema = EventZodSchema.partial();
    const validatedEvent = PartialEventZodSchema.parse(bodyEvent);

    await dbConnect(); // Ensure database connection is established
    // fetch event with the given id
    const event = await EventModel.findById(params._id);

    // if doesn't exit -> return 404
    if (!event) return NextResponse.json({ error: "event not found PATCH" }, { status: 404 });

    // Update the event's fields directly on the document
    Object.assign(event, validatedEvent);

    // update the event
    await event.save();

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error updating event PATCH", error);
    return NextResponse.json({ error: "Failed to update event PATCH" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const EventIdZodSchema = EventZodSchema.pick({ _id: true });
    const validatedEventId = EventIdZodSchema.parse({ _id: params.id });

    await dbConnect(); // Ensure database connection is established
    // Fetch the event by ID before deletion
    const event = await EventModel.findById(params.id);

    // If the event does not exist, return 404
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    // Delete the event by ID
    const result = await EventModel.deleteOne({ _id: validatedEventId });

    // Check if a document was deleted
    if (result.deletedCount === 0)
      return NextResponse.json({ error: "Event not found" }, { status: 404 });

    // Return the deleted event
    // ! TODO -> need to call funcation that will delete all of other event's files as well!
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
