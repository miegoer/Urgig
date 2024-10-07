export type User = {
  _id: string;
  typeOfAccount: string; //Myabe a [] later and then refactor to include both?
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  dateOfBirth: Date;
  location: String;
  settings?: Settings; //settings like white/black theme and similar...
  profileDetails: ProfileDetails; //more info about user
  statistics: Statistics;
  pastEvents: String[]; //Event IDs
  upcomingEvents: String[];
};

export type Artist = User & {
  //Artist specific stuff
};

export type Organizer = User & {
  //Organizer specific stuff
};

export type ProfileDetails = {
  profilePicture?: string; //Either: ID to separate table in Mongo (if we store in DB), URL to any cloud/webdisk API
  aboutMe?: string;
  selectedVideo?: string; //URL to ... youtube?
  socialLinks?: SocialLinks;
  unAvailableDates?: Date[]; //for now
  bannerPicture?: string;
  genre?: string[]; // preselected ones, defined hardcoded into UI! Make a separate file at least...
};

export type SocialLinks = {
  twitter?: string; //url - we can check if it strats with "https://twitter" or "https://x.com"... and validate it with Zod
  facebook?: string; //https://www.facebook.com/
  youtube?: string; //https://www.youtube.com/@
  instagram?: string; //https://www.instagram.com/
  spotify?: string; // https://open.spotify.com/artist/
  tiktok?: string; // https://www.tiktok.com/@
};

export type Settings = {
  //settings like white/black theme
};

//calculate statistics on page load...
export type Statistics = {
  profileViews: number;
  offersGot: number;
  offersAcccepted: number;
  income: number;
  avgCapacity: number;
  totalAtendees: number;
  totalEvents: number;
};
