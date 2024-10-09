import { Event } from "@/types/event";
import dbConnect from "../dbConnect";
import { EventModel } from "../models/eventModel";
import { EventZodSchema } from "../../zodSchemas/eventSchema";

export async function addEvent(event: Event) {
  try {
    const validatedEvent = EventZodSchema.parse(event);

    await dbConnect(); // Ensure database connection is established

    const newEvent = await EventModel.create({ ...validatedEvent });
    return newEvent;
  } catch (error) {
    console.error("Failed to add event:", error);
    throw new Error("Failed to add event to DB");
  }
}

export async function updateEvent(event: Event) {
  try {
    const validatedEvent = EventZodSchema.parse(event);

    await dbConnect(); // Ensure database connection is established

    const currentEvent = await EventModel.findById({ _id: validatedEvent._id });

    if (!currentEvent) {
      throw new Error("Event not found");
    }

    // Update the fields of the current event with validated data
    Object.assign(currentEvent, validatedEvent);
    await currentEvent.save();

    return currentEvent;
  } catch (error) {
    console.error("Failed to update event", error);
    throw new Error("Failed to update event to DB");
  }
}

export async function getEventById(eventId: string) {
  const EventIdZodSchema = EventZodSchema.pick({ _id: true });
  try {
    const validatedEventId = EventIdZodSchema.parse({ _id: eventId });

    await dbConnect(); // Ensure database connection is established

    const currentEvent = await EventModel.findOne({ _id: validatedEventId });

    if (!currentEvent) {
      throw new Error("Event not found");
    }

    return currentEvent;
  } catch (error) {
    console.error("Failed to get event by id:", error);
    throw new Error("Failed to get event by id from DB");
  }
}

export async function getEventByEmail(eventEmail: string) {
  const EventEmailZodSchema = EventZodSchema.pick({ email: true });
  try {
    const validatedEventEmail = EventEmailZodSchema.parse({ email: eventEmail });

    await dbConnect(); // Ensure database connection is established

    const currentEvent = await EventModel.findOne({ email: validatedEventEmail });

    if (!currentEvent) {
      throw new Error("Event not found");
    }
    return currentEvent;
  } catch (error) {
    console.error("Failed to get event by email:", error);
    throw new Error("Failed to get event by email from DB");
  }
}

export async function deleteEvent(eventId: string) {
  const EventIdZodSchema = EventZodSchema.pick({ _id: true });
  try {
    const validatedEventId = EventIdZodSchema.parse({ _id: eventId });

    await dbConnect(); // Ensure database connection is established

    const deletedEvent = await EventModel.deleteOne({ _id: validatedEventId });

    if (!deletedEvent) {
      throw new Error("Event not found");
    }

    return deletedEvent;
  } catch (error) {
    console.error("Failed to get event by id:", error);
    throw new Error("Failed to get event by id from DB");
  }
}
