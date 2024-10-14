import { Booking } from "@/types/booking";
import { bookingsDB } from "./bookings";
import { eventsDB } from "./events";
import { usersDB } from "./users";
import { POST } from "@/app/api/(DB)/bookings/route";
import { Event } from "@/types/event";

const fillOutEachCollectionDB = async (typeDB: any, api: string) => {
  typeDB.map(async (type: any) => {
    await fetch(`/api/${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(type),
    });
  });
};

const connectBookingWithEvents = async () => {
  const response = await fetch(`/api/bookings`);
  const bookingsFromDB: Booking[] = await response.json();

  bookingsFromDB.forEach(async (booking: Booking) => {
    if (booking.bookingEventId && booking.bookingArtistId) {
      await updateEvent_artistsBookingIds(booking._id, booking.bookingEventId);
    }
  });
};

const updateEvent_artistsBookingIds = async (bookingId: string, eventId: string) => {
  const response = await fetch(`/api/events/${eventId}`);

  const event: Event = await response.json();
  if (event.bookingIds?.includes(bookingId)) return;
  // event.bookingIds?.push(bookingId);
  if (event.bookingIds!.length > 1) console.log("event", event);

  // await fetch(`/api/events/${eventId}`, {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(event),
  // });
};

export const fillOutDB = () => {
  // fillOutEachCollectionDB(eventsDB, "events");
  // fillOutEachCollectionDB(bookingsDB, "bookings");
  fillOutEachCollectionDB(AidanBookings, "bookings");
  //fillOutEachCollectionDB(usersDB, "users");
  //connectBookingWithEvents();
};

const AidanBookings = [
  {
    name: "Summer Music Festival",
    link: "https://example.com/summer-festival",
    bannerURL: "https://example.com/images/summer-festival-banner.jpg",
    location: "Central Park, New York",
    offer: 1500,
    sets: [
      {
        date: "2024-06-15",
        setTimeStart: "14:00",
        setTimeEnd: "14:30",
      },
      {
        date: "2024-06-15",
        setTimeStart: "15:00",
        setTimeEnd: "16:00",
      },
    ],
    expectedGenre: ["Pop", "Rock"],
    maxCapacity: 5000,
    status: "confirmed",
    bookingPromoterId: "user_2nQG3IYMuTwNRdbo4WQkNfgsb8o",
    bookingArtistId: "67082c104e2febe010324105",
    bookingEventId: "67082687765db5728aa99587",
    landed: true,
    travelExpenses: 300,
  },
];
