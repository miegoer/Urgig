"use client";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { fetchAndTransformEvents } from "@/app/utils/eventsUtils";
import mockEvents from "@/mockData/events";
import { ArtistEvent } from "@/types/interfaces.ts/artistEvent";
import { useUser } from "@clerk/nextjs";
import { Ubuntu } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

export default function EventsList() {
  const { session, userId } = useTalkSession();
  const [artistUpcomingEvents, setUpcomingArtistEvents] = useState<ArtistEvent[]>([]);
  const [artistPastEvents, setPastArtistEvents] = useState<ArtistEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("userID, useEffect fu", userId);
        const [upcomingEvents, pastEvents]: [ArtistEvent[], ArtistEvent[]] =
          await fetchAndTransformEvents(userId as string);

        setUpcomingArtistEvents(upcomingEvents);
        setPastArtistEvents(pastEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [userId]); // Dependency array uses userId to load only after context is loaded (and userId doesn't change so it's just once)

  const eventList = (events: ArtistEvent[]) => {
    return events.map((event: ArtistEvent) => {
      // console.log(event._id); // Check if _id is valid
      return (
        <div
          key={event._id}
          className="flex flex-row text-[black] mb-[25px] px-5 py-2.5 rounded-[10px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]"
          style={{
            background:
              "linear-gradient(11deg, rgba(255, 103, 43, 1) 0%, rgba(251, 173, 16, 1) 100%)",
          }}
        >
          <span className="text-xl w-[26%] mr-6 border-r-[black] border-r border-solid">
            <span className="text-[35px]">{event.dateD}</span>
            <br />
            {event.dateM}
          </span>
          <div className="flex flex-col text-center w-3/5">
            <span className={`uppercase mx-0 my-1.5 ${ubuntu.className}`}>
              <Link href={`/events/${event._id}`}>{event.name}</Link>
            </span>
            <span className="text-sm italic">{event.time}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-[400px] shadow-[0px_0px_0px_#272525] mt-5 rounded-[20px] p-5 bg-[#252531]">
      <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[3px] mb-[18px]">
        Upcoming Events
      </span>

      {eventList(artistUpcomingEvents)}
    </div>
  );
}
