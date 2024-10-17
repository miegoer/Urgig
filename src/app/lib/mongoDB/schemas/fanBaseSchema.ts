import { Schema } from "mongoose";

export const FanBaseSchema: Schema = new Schema({
  twitter: { type: Number, required: false },
  facebook: { type: Number, required: false },
  youtube: { type: Number, required: false },
  instagram: { type: Number, required: false },
  spotify: { type: Number, required: false },
  tiktok: { type: Number, required: false },
});
