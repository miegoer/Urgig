import { z } from "zod";

// Define related ZodSchemas like ProfileDetails, Settings, etc.
const ProfileDetailsZodSchema = z.object({
  profilePicture: z.string().optional(),
  aboutMe: z.string().optional(),
  selectedVideo: z.string().optional(),
  socialLinks: z
    .object({
      twitter: z.string().url().optional(),
      facebook: z.string().url().optional(),
      youtube: z.string().url().optional(),
      instagram: z.string().url().optional(),
      spotify: z.string().url().optional(),
      tiktok: z.string().url().optional(),
    })
    .optional(),
  unAvailableDates: z.array(z.date()).optional(),
  bannerPicture: z.string().optional(),
  genre: z.array(z.string()).optional(),
});

const SettingsZodSchema = z.object({
  // Add fields for settings
});

const StatisticsZodSchema = z.object({
  profileViews: z.number().optional(),
  offersGot: z.number().optional(),
  offersAcccepted: z.number().optional(),
  income: z.number().optional(),
  avgCapacity: z.number().optional(),
  totalAtendees: z.number().optional(),
  totalEvents: z.number().optional(),
});

export const UserZodSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  typeOfAccount: z.string().optional(),
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  password: z.string().optional(),
  dateOfBirth: z
    .string()
    .transform((str) => new Date(str)) // Transform string to Date
    .refine((date) => !isNaN(date.getTime()), { message: "Invalid date format" })
    .optional(), // Validate that it's a valid date
  location: z.string().optional(),
  settings: SettingsZodSchema.optional(),
  profileDetails: ProfileDetailsZodSchema.optional(),
  statistics: StatisticsZodSchema.optional(),
  pastEvents: z.array(z.string()).optional(),
  upcomingEvents: z.array(z.string()).optional(),
});
