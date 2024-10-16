"use client";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { fetchAndTransformEvents } from "@/app/utils/eventsUtils";
import { fetchBookings } from "@/app/utils/bookingUtils";
import mockEvents from "@/mockData/events";
import { ArtistEvent } from "@/types/interfaces.ts/artistEvent";
import { useUser } from "@clerk/nextjs";
import { Ubuntu } from "next/font/google";
import { Booking } from "@/types/booking";
import { User } from "@/types/user";
import { getUser } from "@/app/utils/userUtils";
import Link from "next/link";
import { useEffect, useState } from "react";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

interface EventsListProps {
  handleCount: (count: number) => void;
}

const artistId = "67082cc74e2febe010324134";
// const promoterId = "670830401234567890abcdef";
const promoterId = "670830101234567890abcdef";

export default function EventsList({ handleCount}: EventsListProps) {
  const { session, userId, userType } = useTalkSession();
  const [artistUpcomingEvents, setUpcomingArtistEvents] = useState<ArtistEvent[]>([]);
  const [artistPastEvents, setPastArtistEvents] = useState<ArtistEvent[]>([]);
  const [bookings, setBookings] = useState<Booking[] | undefined>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let currentId;
        if (userType === 'artist') {
          currentId = artistId;
        } else {
          currentId = promoterId;
        }
        const [upcomingEvents, pastEvents]: [ArtistEvent[], ArtistEvent[]] =
          await fetchAndTransformEvents(currentId as string);
        setUpcomingArtistEvents(upcomingEvents);
        setPastArtistEvents(pastEvents);
        handleCount(upcomingEvents.length);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchAPBookings = async () => {
      try {
        let currentId;
        if (userType === 'artist') {
          currentId = artistId;
        } else {
          currentId = promoterId;
        }
        const upcomingBookings: Booking[] = await fetchBookings(currentId as string);
        setBookings(upcomingBookings)
        console.log(upcomingBookings)
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchEvents();
    fetchAPBookings();
  }, [userId, userType]);

  const eventList = (events: ArtistEvent[]) => {
    return events.map((event: ArtistEvent) => {
      // console.log(event._id)
      return (
        <div
          key={event._id}
          className="w-[100%] h-[97px] flex flex-row text-black mb-6 px-5 py-2.5 bg-[#292346] rounded-2xl shadow-md shadow-[0px_4px_5px_#191922]">
          <div className="w-[90px] flex flex-col justify-center items-center w-[70px] mr-6 border-r border-black p-1">
            <span className="text-[#ccff69] text-4xl tracking-[-3px] mr-5">{event.dateD}</span>
            <span className="text-[#ccff69] text-xl mr-5 ml-1 tracking-[2px]">{event.dateM}</span>
          </div>
          <div className="flex flex-col items-center w-[360px] ml-[-20px] justify-center">
            <span className={`mb-2 px-2 py-1 tracking-[1.5px] text-[12px] bg-[black] text-[#ccff69] rounded-[3px] text-[#ccff69] uppercase shadow-[0px_4px_5px_#191922] `}>
              <Link href={`/events/${event._id}`}>{event.name}</Link>
            </span>
            <span className="italic text-[white] text-xs tracking-[1px]">{event.location}</span>
            {/* Display the image if available
            {event.imageURL && (
              <img
                src={event.imageURL}
                alt={event.name}
                className="mt-2 w-full h-auto object-cover rounded-md"
              />
            )} */}
          </div>
          <div className="flex flex-col justify-center border-l border-black items-center text-center w-[300px]">
          <span className="p-3 text-xs tracking-[1px] text-[white]">
              {userType === 'artist' && bookings ? (
                (() => {
                  const booking = bookings.find((booking) => booking.bookingEventId === event._id);
                  const findPromoter = async() => {
                    try {
                      const user:User = await getUser(booking.bookingPromoterId as string);
                      return user.name;
                    } catch (error) {
                      console.error(error)
                    }
                  }
                  const promoter = findPromoter()
                  return (
                    <>
                      {booking ? (
                        <>
                          <span className="text-[#7675c6] mr-2">Set Time:</span> {booking.sets[0].setTimeStart} - {booking.sets[0].setTimeEnd}
                          <span className="block mt-2 text-[#7675c6]">Contact: <span className="text-[white] ml-2">{promoter}</span></span>
                        </>
                      ) : "No Time Available"}
                      </>
                  );
                })()
              ) : null}
            </span>
            {userType === 'promoter' && bookings ? (
                (() => {
                  const booking = bookings.find((booking) => booking.name.includes(event.name));
                  const artist = booking?.name.split('- ')[1];
                  return (
                    <>
                      {booking ? (
                        <>
                          <span className="uppercase text-[#7675c6]">{artist}</span>
                        </>
                      ) : "No Artists Hired"}
                      </>
                  );
                })()
              ) : null}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-[780px] mt-2 shadow-none rounded-3xl p-5">
      <span className="block text-xs tracking-widest uppercase ml-2.5 mb-4 text-white">
        Upcoming Events
      </span>
      {eventList(artistUpcomingEvents)}

    </div>
  );
}
