"use client";
import { usePageOwnerUser } from "@/app/(context)/PageOwnerUserContext";
import { fetchAndTransformEvents } from "@/app/utils/eventsUtils";
import { ArtistEvent } from "@/types/interfaces.ts/artistEvent";
import { Ubuntu } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

export default function AllEventsList() {
  const { pageOwnerUser } = usePageOwnerUser();
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
          className="w-[100%] h-[97px] flex flex-row text-black mb-6 px-5 py-2.5 bg-[#292346] rounded-2xl shadow-md shadow-[0px_4px_5px_#191922]"
        >
          <div className="w-[90px] flex flex-col justify-center items-center w-[70px] mr-6 border-r border-black p-1">
            <span className="text-[#ccff69] text-4xl tracking-[-3px] mr-5">{event.dateD}</span>
            <span className="text-[#ccff69] text-xl mr-5 ml-1 tracking-[2px]">{event.dateM}</span>
          </div>
          <div className="flex flex-col items-center w-[360px] ml-[-20px] justify-center">
            <span
              className={`mb-2 px-2 py-1 tracking-[1.5px] text-[12px] bg-[black] text-[#ccff69] rounded-[3px] text-[#ccff69] uppercase shadow-[0px_4px_5px_#191922] `}
            >
              <Link href={`/events/${event._id}`}>{event.name}</Link>
            </span>
            <span className="italic text-[white] text-xs tracking-[1px]">{event.location}</span>
            {/* Display the image if available */}
            {/* {event.imageURL && (
              <img
                src={event.imageURL}
                alt={event.name}
                className="mt-2 w-full h-auto object-cover rounded-md"
              />
            )} */}
          </div>
        </div>
      );
    });
  };

  if (!pageOwnerUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mt-2 shadow-none rounded-3xl p-5 pl-10">
      <span className="block text-xs tracking-widest uppercase ml-2.5 mb-4 text-white">
        Upcoming Events
      </span>

      {!artistUpcomingEvents ? <div>Loading...</div> : eventList(artistUpcomingEvents)}

      <span className="block text-xs tracking-widest uppercase ml-2.5 mb-4 text-white">
        Past Events
      </span>
      {!artistPastEvents ? <div>Loading...</div> : eventList(artistPastEvents)}
    </div>
  );
}
