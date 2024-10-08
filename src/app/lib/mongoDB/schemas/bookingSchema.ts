import { Booking } from "@/types/booking";
import { Document, Schema } from "mongoose";
import { SetSchema } from "./setSchema";

export interface BookingDoc extends Booking, Document {
  _id: string;
}

export const BookingSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  link: { type: String, required: false },
  bannerURL: { type: String, required: false },
  location: { type: String, required: true },
  offer: { type: Number, required: true },
  sets: { type: [SetSchema], required: true },
  expectedGenre: { type: [String], required: true }, //preselected values
  maxCapacity: { type: Number, required: true },
  status: { type: String, required: true }, //negotiationg, confirmed, declined
  bookingOrganizerId: { type: String, required: true },
  bookingArtistId: { type: String, required: true },
});
