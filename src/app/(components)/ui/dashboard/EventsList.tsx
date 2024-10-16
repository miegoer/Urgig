"use client";
import { usePageOwnerUser } from "@/app/(context)/PageOwnerUserContext";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { fetchAndTransformEvents } from "@/app/utils/eventsUtils";
import mockEvents from "@/mockData/events";
import { ArtistEvent } from "@/types/interfaces.ts/artistEvent";
import { User } from "@/types/user";
import { useUser } from "@clerk/nextjs";
import { Ubuntu } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

export default function EventsList() {
  const { pageOwnerUser } = usePageOwnerUser();
  const { session, userId } = useTalkSession();
  const [artistUpcomingEvents, setUpcomingArtistEvents] = useState<ArtistEvent[]>([]);
  const [artistPastEvents, setPastArtistEvents] = useState<ArtistEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!pageOwnerUser) return;
      console.log("userID, useEffect fu", pageOwnerUser._id);
      try {
        const [upcomingEvents, pastEvents]: [ArtistEvent[], ArtistEvent[]] =
          await fetchAndTransformEvents(pageOwnerUser._id as string);

        setUpcomingArtistEvents(upcomingEvents);
        setPastArtistEvents(pastEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [pageOwnerUser]);

  const eventList = (events: ArtistEvent[]) => {
    return events.map((event: ArtistEvent) => {
      // console.log(event._id)
      return (
        <div
          key={event._id}
          className="flex flex-row text-black mb-6 px-5 py-2.5 rounded-2xl shadow-md"
          style={{
            background:
              "linear-gradient(11deg, rgba(255, 103, 43, 1) 0%, rgba(251, 173, 16, 1) 100%)",
          }}
        >
          <div className="w-1/4 mr-6 border-r border-black">
            <span className="text-4xl">{event.dateD}</span>
            <br />
            <span className="text-xl">{event.dateM}</span>
          </div>
          <div className="flex flex-col items-center w-3/5">
            <span className={`uppercase my-1.5 ${ubuntu.className}`}>
              <Link href={`/events/${event._id}`}>{event.name}</Link>
            </span>
            <span className="text-sm italic">{event.time}</span>
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

  if (!pageOwnerUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-80 shadow-none mt-5 rounded-3xl p-5 bg-gray-800">
      <span className="block text-xs tracking-widest uppercase ml-2.5 mt-1 mb-4 text-white">
        Upcoming Events
      </span>

      {!artistUpcomingEvents ? <div>Loading...</div> : eventList(artistUpcomingEvents)}

      <span className="block text-xs tracking-widest uppercase ml-2.5 mt-1 mb-4 text-white">
        Past Events
      </span>
      {!artistPastEvents ? <div>Loading...</div> : eventList(artistPastEvents)}
    </div>
  );
}
