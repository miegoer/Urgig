import mongoose, { Schema } from "mongoose";
import { ProfileDetails, Settings, SocialLinks, Statistics, User } from "@/types/user";

export const UserSchema: Schema = new Schema({
  //_id: string; added by mongo itself
  typeOfAccount: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: false },
  contactNumber: { type: String, required: false },
  password: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  location: { type: Date, required: false },
  settings: { type: [Schema.Types.ObjectId], ref: "Settings", required: false },
  profileDetails: { type: [Schema.Types.ObjectId], ref: "ProfileDetails", required: false },
  statistics: { type: [Schema.Types.ObjectId], ref: "Statistics", required: false },
  pastEvents: { type: [String], required: false }, //preselected values
  upcomingEvents: { type: [String], required: false }, //preselected values
});

const ProfileSchema: Schema = new Schema({
  profilePicture: { type: String, required: false }, //Either: ID to separate table in Mongo (if we store in DB), URL to any cloud/webdisk API
  aboutMe: { type: String, required: false },
  selectedVideo: { type: String, required: false }, //URL to ... youtube?
  socialLinks: { type: [Schema.Types.ObjectId], ref: "SocialLinks", required: true },
  unAvailableDates: { type: [Date], required: false }, //for now
  bannerPicture: { type: String, required: false },
  genre: { type: [String], required: false }, // preselected ones, defined hardcoded into UI! Make a separate file at least...
});

const SettingsSchema: Schema = new Schema({});

const SocialLinksSchema: Schema = new Schema({
  twitter: { type: String, required: false },
  facebook: { type: String, required: false },
  youtube: { type: String, required: false },
  instagram: { type: String, required: false },
  spotify: { type: String, required: false },
  tiktok: { type: String, required: false },
});

const StatisticsSchema: Schema = new Schema({
  profileViews: { type: Number, required: false },
  offersGot: { type: Number, required: false },
  offersAcccepted: { type: Number, required: false },
  income: { type: Number, required: false },
  avgCapacity: { type: Number, required: false },
  totalAtendees: { type: Number, required: false },
  totalEvents: { type: Number, required: false },
});

export const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export const SettingsModel =
  mongoose.models.Settings || mongoose.model<Settings>("Settings", SettingsSchema);

export const StatisticsModel =
  mongoose.models.Statistics || mongoose.model<Statistics>("Statistics", StatisticsSchema);

export const ProfileDetailsModel =
  mongoose.models.ProfileDetails || mongoose.model<ProfileDetails>("ProfileDetails", ProfileSchema);

export const SocialLinksModel =
  mongoose.models.SocialLinks || mongoose.model<SocialLinks>("SocialLinks", SocialLinksSchema);
