import { Document, Schema, ValidatorProps } from "mongoose";
import { StatisticsSchema } from "./statisticsSchema";
import { ProfileSchema } from "./profileSchema";
import { User } from "@/types/user";

const SettingsSchema: Schema = new Schema({});

export interface UserDoc extends User, Document {
  _id: string;
}

export const UserSchema: Schema = new Schema({
  //_id: string; added by mongo itself
  typeOfAccount: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^\S+@\S+\.\S+$/.test(v), // Regex for valid email format
      message: (props: ValidatorProps) => `${props.value} is not a valid email!`,
    },
  },
  name: { type: String, required: false },
  contactNumber: { type: String, required: false },
  password: { type: String, required: false, select: false }, // Ensure password is excluded by default. You won’t get the password field unless you specifically request it in a query using .select("+password").
  dateOfBirth: { type: Date, required: false },
  location: { type: String, required: false },
  settings: { type: [SettingsSchema], ref: "Settings", required: false },
  profileDetails: { type: [ProfileSchema], ref: "ProfileDetails", required: false },
  statistics: { type: [StatisticsSchema], ref: "Statistics", required: false },
  pastEvents: { type: [String], required: false }, //preselected values
  upcomingEvents: { type: [String], required: false }, //preselected values
});
