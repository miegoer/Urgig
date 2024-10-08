import { Document } from "mongoose";

export type Event = Document & {
  _id: string;
  name: string;
  organiserId: string;
  date: Date;
  bannerURL?: string;
  location: string;
  genre: string[]; //preselected values
  duration: number; //in days
  maxCapacity: number;
  link?: string;
};
