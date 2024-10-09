import { Schema } from "mongoose";

export const SocialLinksSchema: Schema = new Schema({
  twitter: { type: String, required: false },
  facebook: { type: String, required: false },
  youtube: { type: String, required: false },
  instagram: { type: String, required: false },
  spotify: { type: String, required: false },
  tiktok: { type: String, required: false },
});
