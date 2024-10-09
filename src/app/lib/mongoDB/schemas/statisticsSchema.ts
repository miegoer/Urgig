import { Schema } from "mongoose";

export const StatisticsSchema: Schema = new Schema({
  profileViews: { type: Number, required: false },
  offersGot: { type: Number, required: false },
  offersAcccepted: { type: Number, required: false },
  income: { type: Number, required: false },
  avgCapacity: { type: Number, required: false },
  totalAtendees: { type: Number, required: false },
  totalEvents: { type: Number, required: false },
});
