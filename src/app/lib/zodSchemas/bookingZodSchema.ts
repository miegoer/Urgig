import { z } from "zod";

export const SetZodSchema = z.object({
  _id: z.string().min(1), // _id must be a non-empty string
  date: z.date(), // Date must be a valid Date object
  setTimeStart: z.string().min(1), // Time start as a non-empty string (e.g., HH:MM format)
  setTimeEnd: z.string().min(1), // Time end as a non-empty string (e.g., HH:MM format)
});

export const BookingZodSchema = z.object({
  _id: z.string().min(1), // _id must be a non-empty string
  name: z.string().min(1), // name must be a non-empty string
  link: z.string().url().optional(), // Optional URL for link
  bannerURL: z.string().url().optional(), // Optional URL for bannerURL
  location: z.string().min(1), // location must be a non-empty string
  offer: z.number().positive(), // offer must be a positive number (cash amount)
  sets: z.array(SetZodSchema), // Array of `Set` objects, validated by the Set schema
  expectedGenre: z.array(z.string().min(1)), // Array of non-empty strings for genres
  maxCapacity: z.number().int().positive(), // maxCapacity must be a positive integer
  status: z.enum(["negotiation", "confirmed", "declined"]), // Status can be one of the preselected values
  bookingPromoterId: z.string().min(1), // Organizer ID must be a non-empty string
  bookingArtistId: z.string().min(1), // Artist ID must be a non-empty string
  landed: z.boolean().optional(),
  travelExpenses: z.number().positive().optional(),
});
