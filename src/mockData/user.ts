import { User } from "@/types/user";

// no images included yet

const mockUsers: User[] = [
  {
    _id: "artist1",
    typeOfAccount: "artist",
    name: "DJ Frankenstein",
    email: "djfrankenstein@gmail.com",
    contactNumber: "+1234567890",
    password: "1234",
    dateOfBirth: new Date("1990-05-10"),
    location: "Los Angeles, CA",
    profileDetails: {
      profilePicture: '/public/mockUsers/DJFrankenstein.png',
      aboutMe: "DJ Frankenstein is the best DJ you've never heard of. He was constructed with the remains of five legendary DJs across the world, who all perished under mysterious circumstances. All hail the Undead!",
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
  {
    _id: "artist2",
    typeOfAccount: "artist",
    name: "DJ Pancakes",
    email: "djpancakes@gmail.com",
    contactNumber: "+1234567891",
    password: "1234",
    dateOfBirth: new Date("1992-05-11"),
    location: "London, UK",
    profileDetails: {
      profilePicture: '/public/mockUsers/DJPancakes.png',
      aboutMe: "You spin records, I spin pancakes. Whatever that means.",
      selectedVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      socialLinks: {
        twitter: "https://twitter.com/johndoe",
        facebook: "https://www.facebook.com/johndoe",
        youtube: "https://www.youtube.com/@johndoe",
        instagram: "https://www.instagram.com/johndoe",
        spotify: "https://open.spotify.com/artist/1A2b3C4d5E6F7G8H",
        tiktok: "https://www.tiktok.com/@johndoe",
      },
      unAvailableDates: [new Date("2024-01-25"), new Date("2024-02-20")],
      genre: ["Dark Ambient", "EDM", "Techno"],
    },
    statistics: {
      profileViews: 9000,
      offersGot: 50,
      offersAcccepted: 30,
      income: 150000,
      avgCapacity: 8000,
      totalAtendees: 50000,
      totalEvents: 20,
    },
    pastEvents: ["event5", "event1"],
    upcomingEvents: ["event8"],
  }
];

export default mockUsers;
