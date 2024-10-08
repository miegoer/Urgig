import { Booking } from "@/types/booking";
import { Document } from "mongoose";

export interface BookingDoc extends Booking, Document {
  _id: string;
}
