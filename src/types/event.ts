export type Event = {
  _id: string;
  name: string;
  date: Date;
  bannerURL: string;
  location: string;
  genre: string[]; //preselected values
  duration: number;
  maxCapacity: number;
  link: string;
};
