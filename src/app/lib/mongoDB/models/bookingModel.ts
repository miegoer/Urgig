import mongoose, { Schema } from "mongoose";
import { Booking } from "@/types/booking";

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

export const BookingModel =
  mongoose.models.Booking || mongoose.model<Booking>("Booking", BookingSchema);

export const SetModel = mongoose.models.Set || mongoose.model("Set", SetSchema);
