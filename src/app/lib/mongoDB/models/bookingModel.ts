import { Schema, model, models, Document } from "mongoose";
import { Booking, Set } from "@/types/booking";

export interface BookingDoc extends Booking, Document {
  _id: string;
}

export const BookingSchema: Schema = new Schema({
  //_id: string; added by mongo itself
  name: { type: String, required: true },
  link: { type: String, required: false },
  bannerURL: { type: String, required: false },
  // location: { type: String, required: true },
  offer: { type: Number, required: true },
  sets: { type: [Schema.Types.ObjectId], ref: "Set", required: true },
  expectedGenre: { type: [String], required: true }, //preselected values
  maxCapacity: { type: Number, required: true },
  status: { type: String, required: true }, //negotiationg, confirmed, declined
  bookingOrganizerId: { type: String, required: true },
  bookingArtistId: { type: String, required: true },
});

const SetSchema: Schema = new Schema({
  //_id: string; added by mongo itself
  date: { type: Date, required: true },
  setTimeStart: { type: String, required: true },
  setTimeEnd: { type: String, required: true },
});

export const BookingModel = models.Booking || model<BookingDoc>("Booking", BookingSchema);
