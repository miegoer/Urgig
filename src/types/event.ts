import { string } from "zod";

export type Event = {
  _id?: string;
  name: string;
  promoterId: string;
  date: Date;
  imageURL?: string;
  location: string;
  genre: string[]; //preselected values
  duration: number; //in days
  maxCapacity: number | string;
  link?: string;
  bookingIds?: string[];
  description?: string;
};
