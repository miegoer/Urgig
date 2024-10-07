import { Booking } from "@/types/booking";

// no images included yet

const mockBookings: Booking[] = [
  {
    _id: "booking1",
    name: "Summer Vibes Festival",
    link: "https://summervibesfestival.com",
    location: "Los Angeles, CA",
    offer: 5000,
    sets: [
      { _id: "set1", date: new Date("2024-07-12"), setTimeStart: "18:00", setTimeEnd: "19:00" }
    ],
    expectedGenre: ["Pop", "EDM"],
    maxCapacity: 10000,
    status: "negotiating",
    bookingOrganizerId: "organizer1",
    bookingArtistId: "artist1"
  },
  {
    _id: "booking2",
    name: "Rock Out Loud",
    link: "https://rockoutloud.com",
    location: "Austin, TX",
    offer: 8000,
    sets: [
      { _id: "set2", date: new Date("2024-09-10"), setTimeStart: "20:00", setTimeEnd: "21:30" }
    ],
    expectedGenre: ["Rock"],
    maxCapacity: 15000,
    status: "confirmed",
    bookingOrganizerId: "organizer2",
    bookingArtistId: "artist1"
  },
  {
    _id: "booking3",
    name: "Indie Nights",
    link: "https://indienights.com",
    location: "New York, NY",
    offer: 6000,
    sets: [
      { _id: "set3", date: new Date("2024-06-15"), setTimeStart: "19:00", setTimeEnd: "20:00" }
    ],
    expectedGenre: ["Indie", "Alternative"],
    maxCapacity: 8000,
    status: "negotiating",
    bookingOrganizerId: "organizer3",
    bookingArtistId: "artist1"
  },
  {
    _id: "booking4",
    name: "Jazz in the Park",
    link: "https://jazzinthepark.com",
    location: "Chicago, IL",
    offer: 7000,
    sets: [
      { _id: "set4", date: new Date("2024-05-22"), setTimeStart: "17:00", setTimeEnd: "18:30" }
    ],
    expectedGenre: ["Jazz", "Blues"],
    maxCapacity: 12000,
    status: "confirmed",
    bookingOrganizerId: "organizer1",
    bookingArtistId: "artist1"
  },
  {
    _id: "booking5",
    name: "EDM Blast",
    link: "https://edmblast.com",
    location: "Miami, FL",
    offer: 9000,
    sets: [
      { _id: "set5", date: new Date("2024-11-18"), setTimeStart: "22:00", setTimeEnd: "23:30" }
    ],
    expectedGenre: ["EDM", "House"],
    maxCapacity: 20000,
    status: "negotiating",
    bookingOrganizerId: "organizer2",
    bookingArtistId: "artist1"
  },
  {
    _id: "booking6",
    name: "Hip-Hop Block Party",
    link: "https://hiphopblockparty.com",
    location: "Atlanta, GA",
    offer: 7500,
    sets: [
      { _id: "set6", date: new Date("2024-08-25"), setTimeStart: "20:30", setTimeEnd: "22:00" }
    ],
    expectedGenre: ["Hip-Hop"],
    maxCapacity: 10000,
    status: "confirmed",
    bookingOrganizerId: "organizer3",
    bookingArtistId: "artist1"
  },
  {
    _id: "booking7",
    name: "Country Music Jamboree",
    link: "https://countrymusicjamboree.com",
    location: "Nashville, TN",
    offer: 6000,
    sets: [
      { _id: "set7", date: new Date("2024-10-10"), setTimeStart: "17:30", setTimeEnd: "18:30" }
    ],
    expectedGenre: ["Country"],
    maxCapacity: 15000,
    status: "declined",
    bookingOrganizerId: "organizer1",
    bookingArtistId: "artist1"
  },
  {
    _id: "booking8",
    name: "Electronic Sounds Festival",
    link: "https://electronicsoundsfestival.com",
    location: "Berlin, Germany",
    offer: 8500,
    sets: [
      { _id: "set8", date: new Date("2024-12-05"), setTimeStart: "23:00", setTimeEnd: "00:30" }
    ],
    expectedGenre: ["Electronic", "Techno"],
    maxCapacity: 18000,
    status: "negotiating",
    bookingOrganizerId: "organizer2",
    bookingArtistId: "artist1"
  },
  {
    _id: "booking9",
    name: "Latin Music Extravaganza",
    link: "https://latinmusicextravaganza.com",
    location: "Miami, FL",
    offer: 9500,
    sets: [
      { _id: "set9", date: new Date("2024-06-30"), setTimeStart: "19:00", setTimeEnd: "20:30" }
    ],
    expectedGenre: ["Latin", "Reggaeton"],
    maxCapacity: 12000,
    status: "confirmed",
    bookingOrganizerId: "organizer3",
    bookingArtistId: "artist1"
  },
  {
    _id: "booking10",
    name: "Metal Mayhem",
    link: "https://metalmayhem.com",
    location: "London, UK",
    offer: 7000,
    sets: [
      { _id: "set10", date: new Date("2024-03-20"), setTimeStart: "20:00", setTimeEnd: "21:30" }
    ],
    expectedGenre: ["Metal", "Hard Rock"],
    maxCapacity: 14000,
    status: "negotiating",
    bookingOrganizerId: "organizer1",
    bookingArtistId: "artist1"
  }
];


export default mockBookings