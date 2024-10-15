import { Schema } from "mongoose";
import { SocialLinksSchema } from "./socialLinksSchema";

export const ProfileSchema: Schema = new Schema({
  profilePicture: { type: String, required: false }, //Either: ID to separate table in Mongo (if we store in DB), URL to any cloud/webdisk API
  aboutMe: { type: String, required: false },
  selectedVideo: { type: String, required: false }, //URL to ... youtube?
  socialLinks: { type: SocialLinksSchema, ref: "SocialLinks", required: true },
  unAvailableDates: { type: [Date], required: false }, //for now
  bannerPicture: { type: String, required: false },
  genre: { type: [String], required: false }, // preselected ones, defined hardcoded into UI! Make a separate file at least...
});
