import { User } from "@/types/user";

// no images included yet

const mockUsers: User[] = [
  {
    _id: "artist1",
    typeOfAccount: "artist",
    name: "John Doe",
    email: "johndoe@gmail.com",
    contactNumber: "+1234567890",
    password: "1234",
    dateOfBirth: new Date("1990-05-10"),
    location: "Los Angeles, CA",
    profileDetails: {
      aboutMe: "I'm an electronic music artist based in LA, creating unique soundscapes.",
      selectedVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      socialLinks: {
        twitter: "https://twitter.com/johndoe",
        facebook: "https://www.facebook.com/johndoe",
        youtube: "https://www.youtube.com/@johndoe",
        instagram: "https://www.instagram.com/johndoe",
        spotify: "https://open.spotify.com/artist/1A2b3C4d5E6F7G8H",
        tiktok: "https://www.tiktok.com/@johndoe",
      },
      unAvailableDates: [new Date("2024-01-15"), new Date("2024-02-20")],
      genre: ["EDM", "House"],
    },
    statistics: {
      profileViews: 12000,
      offersGot: 50,
      offersAcccepted: 35,
      income: 150000,
      avgCapacity: 8000,
      totalAtendees: 50000,
      totalEvents: 20,
    },
    pastEvents: ["event5", "event1"],
    upcomingEvents: ["event8"],
  },
];

export default mockUsers;
