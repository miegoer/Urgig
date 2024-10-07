import { Document } from "mongoose";

// Interface extending mongoose.Document
export type Booking = Document & {
  _id: string;
  name: string;
  link?: string;
  bannerURL?: string;
  location: string;
  offer: number; //cash amount
  sets: Set[];
  expectedGenre: string[]; //preselected values
  maxCapacity: number;
  status: string; //negotiationg, confirmed, declined
  bookingOrganizerId: string;
  bookingArtistId: string;
};

export type Set = {
  _id: string;
  date: Date;
  setTimeStart: string; //needs to be two time pickers...
  setTimeEnd: string; //needs to be two time pickers...
};
