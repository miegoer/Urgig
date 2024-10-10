import { z } from "zod";

export const EventZodSchema = z.object({
  // _id: z.string().min(1),
  name: z.string().min(1),
  organiserId: z.string().min(1),
  date: z
    .string()
    .transform((str) => new Date(str)) // Transform string to Date
    .refine((date) => !isNaN(date.getTime()), { message: "Invalid date format" })
    .optional(), // Validate that it's a valid date
  bannerURL: z.string().url().optional(), // Optional URL for bannerURL
  location: z.string().min(1),
  genre: z.array(z.string().min(1)),
  duration: z.number().positive(), // duration must be a positive number (in days)
  maxCapacity: z.number().int().positive(), // maxCapacity must be a positive integer
  link: z.string().url().optional(), // Optional URL for link
});
