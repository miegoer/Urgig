import { Document, Schema } from 'mongoose';
import { StatisticsSchema } from './statisticsSchema';
import { ProfileSchema } from './profileSchema';
import { User } from '@/types/user';

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
  stageName: { type: String, required: false },
  email: { type: String, required: true },
  name: { type: String, required: false },
  contactNumber: { type: String, required: false },
  password: { type: String, required: false, select: false }, // Ensure password is excluded by default. You won’t get the password field unless you specifically request it in a query using .select("+password").
  dateOfBirth: { type: Date, required: false },
  location: { type: String, required: false },
  settings: { type: [SettingsSchema], ref: 'Settings', required: false },
  profileDetails: {
    type: [ProfileSchema],
    ref: 'ProfileDetails',
    required: false,
  },
  statistics: { type: [StatisticsSchema], ref: 'Statistics', required: false },
  pastEvents: { type: [String], required: false }, //preselected values
  upcomingEvents: { type: [String], required: false }, //preselected values
});

// import { Document, Schema } from "mongoose";
// import { StatisticsSchema } from "./statisticsSchema";
// import { ProfileSchema } from "./profileSchema";
// import { User } from "@/types/user";

// const SettingsSchema: Schema = new Schema({});

// export interface UserDoc extends User, Document {
//   _id: string;
// }

// export const UserSchema: Schema = new Schema({
//   //_id: string; added by mongo itself
//   typeOfAccount: { type: String, required: true },
//   email: { type: String, required: true },
//   name: { type: String, required: false },
//   contactNumber: { type: String, required: false },
//   password: { type: String, required: false, select: false }, // Ensure password is excluded by default. You won’t get the password field unless you specifically request it in a query using .select("+password").
//   dateOfBirth: { type: Date, required: false },
//   location: { type: String, required: false },
//   settings: { type: [SettingsSchema], ref: "Settings", required: false },
//   profileDetails: { type: [ProfileSchema], ref: "ProfileDetails", required: false },
//   statistics: { type: [StatisticsSchema], ref: "Statistics", required: false },
//   pastEvents: { type: [String], required: false }, //preselected values
//   upcomingEvents: { type: [String], required: false }, //preselected values
// });
