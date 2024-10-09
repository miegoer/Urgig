import { Event } from "@/types/event";
import { Document, Schema } from "mongoose";

export interface EventDoc extends Event, Document {
  //location: string; // see how location is stored, string or lat/lon???
  _id: string;
}

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
