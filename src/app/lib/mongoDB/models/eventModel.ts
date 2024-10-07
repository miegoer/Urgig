import mongoose, { Schema } from "mongoose";
import { Event } from "@/types/event";

export const EventSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  bannerURL: { type: String, required: false },
  location: { type: String, required: true },
  genre: { type: [String], required: true },
  duration: { type: Number, required: true },
  maxCapacity: { type: Number, required: true },
  link: { type: String, required: false },
  organiserId: { type: String, required: true },
});

export const EventModel = mongoose.models.Event || mongoose.model<Event>("Event", EventSchema);
