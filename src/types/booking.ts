export type Booking = {
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
  bookingPromoterId: string;
  bookingArtistId: string;
  bookingEventId: string;
  landed?: boolean;
  travelExpenses?: number;
};

export type Set = {
  _id: string;
  date: Date;
  setTimeStart: string; //needs to be two time pickers...
  setTimeEnd: string; //needs to be two time pickers...
};
