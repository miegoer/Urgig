import { Schema } from "mongoose";

export const SetSchema: Schema = new Schema({
  _id: { type: String, required: true },
  date: { type: Date, required: true },
  setTimeStart: { type: String, required: true },
  setTimeEnd: { type: String, required: true },
});
