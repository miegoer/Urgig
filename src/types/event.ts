import { Document } from "mongoose";

export type Event = Document & {
  _id: string;
  name: string;
  date: Date;
  bannerURL?: string;
  location: string;
  genre: string[]; //preselected values
  duration: number;
  maxCapacity: number;
  link?: string;
  organiserId: string;
};
