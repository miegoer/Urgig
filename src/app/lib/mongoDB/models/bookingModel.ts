import { model, models } from "mongoose";
import { BookingDoc, BookingSchema } from "../schemas/bookingSchema";

export const BookingModel = models.Booking || model<BookingDoc>("Booking", BookingSchema);
