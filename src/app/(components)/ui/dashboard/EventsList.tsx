"use client";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { fetchAndTransformEvents } from "@/app/utils/eventsUtils";
import { fetchBookings } from "@/app/utils/bookingUtils";
import mockEvents from "@/mockData/events";
import { ArtistEvent } from "@/types/interfaces.ts/artistEvent";
import { useUser } from "@clerk/nextjs";
import { Ubuntu } from "next/font/google";
import { Booking } from "@/types/booking";
import Link from "next/link";
import { useEffect, useState } from "react";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

interface EventsListProps {
  handleCount: (count: number) => void;
}

export default function EventsList({ handleCount}: EventsListProps) {
  const { session, userId, userType } = useTalkSession();
  const [artistUpcomingEvents, setUpcomingArtistEvents] = useState<ArtistEvent[]>([]);
  const [artistPastEvents, setPastArtistEvents] = useState<ArtistEvent[]>([]);
  const [artistBookings, setArtistBookings] = useState<Booking[] | undefined>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("userID, useEffect fu", userId);
        const [upcomingEvents, pastEvents]: [ArtistEvent[], ArtistEvent[]] =
          await fetchAndTransformEvents(userId as string);
        setUpcomingArtistEvents(upcomingEvents);
        setPastArtistEvents(pastEvents);
        console.log(upcomingEvents)
        handleCount(upcomingEvents.length);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchArtistBookings = async () => {
      try {
        const upcomingBookings: Booking[] = await fetchBookings(userId as string);
        setArtistBookings(upcomingBookings)
        console.log(upcomingBookings)
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchEvents();
    if (userType === 'artist') {
      fetchArtistBookings();
    }
  }, [userId, userType]);

  const eventList = (events: ArtistEvent[]) => {
    return events.map((event: ArtistEvent) => {
      // console.log(event._id)
      return (
        <div
          key={event._id}
          className="w-[600px] flex flex-row text-black mb-6 px-5 py-2.5 bg-[#292346] rounded-2xl shadow-md shadow-[0px_4px_5px_#191922]">
          <div className="flex flex-col justify-center items-center w-[70px] mr-6 border-r border-black p-1">
            <span className="text-[#ccff69] text-4xl tracking-[-3px] mr-5">{event.dateD}</span>
            <span className="text-[#ccff69] text-xl mr-5 ml-1 tracking-[2px]">{event.dateM}</span>
          </div>
          <div className="flex flex-col items-center w-3/5">
            <span className={`my-1.5 px-2 py-1 tracking-[1.5px] text-[12px] bg-[black] text-[#ccff69] rounded-[3px] text-[#ccff69] uppercase shadow-[0px_4px_5px_#191922] `}>
              <Link href={`/events/${event._id}`}>{event.name}</Link>
            </span>
            <span className="mt-[8px] text-xs tracking-[1px] text-[white]">
              {userType === 'artist' && artistBookings ? (
                (() => {
                  const booking = artistBookings.find((booking) => booking.bookingEventId === event._id);
                  return (
                    <>
                      {booking ? (
                        <>
                          <span className="uppercase text-[#7675c6]">Set Time:</span> {booking.sets[0].setTimeStart} - {booking.sets[0].setTimeEnd}
                        </>
                      ) : "No Time Available"}
                      </>
                  );
                })()
              ) : null}
            </span>


            {/* Display the image if available */}
            {event.imageURL && (
              <img
                src={event.imageURL}
                alt={event.name}
                className="mt-2 w-full h-auto object-cover rounded-md"
              />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-[450px] mt-2 shadow-none rounded-3xl p-5">
      <span className="block text-xs tracking-widest uppercase ml-2.5 mb-4 text-white">
        Upcoming Events
      </span>
      {eventList(artistUpcomingEvents)}

    </div>
  );
}
