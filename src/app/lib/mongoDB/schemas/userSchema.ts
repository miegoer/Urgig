import { Document, Schema, ValidatorProps } from "mongoose";
import { StatisticsSchema } from "./statisticsSchema";
import { ProfileSchema } from "./profileSchema";
import { User } from "@/types/user";

const SettingsSchema: Schema = new Schema({});

export interface UserDoc extends User, Document {
  _id: string;
}

export const UserSchema: Schema = new Schema({
  // changed, to be able to use clerk id
  // _id: string; added by mongo itself
  _id: { type: String, required: true },
  typeOfAccount: { type: String, required: true },
  // added stageName
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^\S+@\S+\.\S+$/.test(v); // Simple regex to check email format
      },
      message: (props: ValidatorProps) => `${props.value} is not a valid email!`,
    },
  },
  stageName: { type: String, required: false },
  companyName: { type: String, required: false },
  name: { type: String, required: false },
  contactNumber: { type: String, required: false },
  password: { type: String, required: false, select: false }, // Ensure password is excluded by default. You won’t get the password field unless you specifically request it in a query using .select("+password").
  dateOfBirth: { type: Date, required: false },
  location: { type: String, required: false },
  settings: { type: SettingsSchema, ref: "Settings", required: false },
  profileDetails: {
    type: ProfileSchema,
    ref: "ProfileDetails",
    required: false,
  },
  statistics: { type: StatisticsSchema, ref: "Statistics", required: false },
  pastEvents: { type: [String], ref: "Event", required: false }, //preselected values
  upcomingEvents: { type: [String], ref: "Event", required: false }, //preselected values
});
