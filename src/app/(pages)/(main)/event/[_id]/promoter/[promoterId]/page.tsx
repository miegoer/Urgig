"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArtistEvent } from "@/types/interfaces.ts/artistEvent";
import { fetchAndTransformEvents } from "@/app/utils/eventsUtils";
import { User } from "@/types/user";

export default function Promoter() {
  const { promoterId } = useParams();

  const [promoter_id, setPromoter_id] = useState<string>("");
  const [promoter, setPromoter] = useState<User| null>(null);
  const [artistUpcomingEvents, setUpcomingArtistEvents] = useState<
    ArtistEvent[]
  >([]);
  const [artistPastEvents, setPastArtistEvents] = useState<ArtistEvent[]>([]);

  useEffect(() => {
    // geting promoter_id from params when mounting
    if (typeof promoterId === "string") {
      setPromoter_id(promoterId);
    }
  }, []);

  useEffect(() => {
    const fetchPromoter = () => {
      //fetching promoter when promoter_id
      fetch(`/api/users/${promoter_id}`)
        .then((response) => response.json())
        .then((data) => {
          setPromoter(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (promoter_id) {
      fetchPromoter();
    }
  }, [promoter_id]);

  useEffect(() => {
    //fetching events when promoter
    if (promoter_id && promoter) {
      const fetchEvents = async () => {
        try {
          const [upcomingEvents, pastEvents]: [ArtistEvent[], ArtistEvent[]] =
            await fetchAndTransformEvents(promoter_id as string);

          setUpcomingArtistEvents(upcomingEvents);
          setPastArtistEvents(pastEvents);
          console.log('upcoming-----------',upcomingEvents,'past----------',pastEvents);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
      fetchEvents();
    }
  }, [promoter, promoter_id]);

  return (
    <>
      <div className="flex flex-col justify-center  w-[600px] ml-[30px]">
        <div
          className={`z-10 w-[100%] mt-8 p-5 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
        >
          Promoter Info
        </div>

        <div className="flex flex-col justify-center ml-[78px] w-[450px] ">
          <div className="border-t w-[300px] h-0 self-center"></div>

          <div className="mt-3 text-xs text-[#a0aec0] space-y-1 text-center">
            <p>{promoter?.companyName}</p>
            <p>{promoter?.email}</p>
            <p>{promoter?.contactNumber}</p>
            <p>{promoter?.location}</p>
          </div>

          <div className="border-t w-[300px] h-0 self-center mt-4"></div>

          <div className="mt-4  text-[white] text-sm space-y-1 text-center tracking-[1.5px] ">
            <p className="text-xs text-[#a0aec0]">Bio: </p>
            <p>"{promoter?.profileDetails?.aboutMe}"</p>
          </div>

          <div className="border-t w-[300px] h-0 self-center mt-4"></div>

          <div className="mt-4  text-[white] text-sm space-y-1 text-center tracking-[1.5px] ">
            <Link href={`promoter?.profileDetails?.selectedVideo`}>
              <p className="text-xs text-[#a0aec0]">
                Check out my work{" "}
                <span className="text-xs text-[#546d8f] underline mt-8">
                  here
                </span>{" "}
              </p>
            </Link>
          </div>

          <div className="border-t w-[300px] h-0 self-center mt-4"></div>

          <div className="mt-4 text-[white] text-sm space-y-1 text-center tracking-[1.5px] ">
            <p className="text-xs text-[#a0aec0] ">Upcoming events: </p>
            {artistUpcomingEvents.map((event: any, index: number) => (
              <div key={event._id}>
                <div>
                  {event.name && (
                    <Link href={`/event/${promoter.events[index]}`}>
                    
                      <p>
                        {event.name}
                        <span className="text-xs text-[#a0aec0] ">
                         {event.dateD} of {event.dateM}
                        </span>
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* <p className="text-xs text-[#a0aec0] ">Past events: </p>
            {artistPastEvents.map((event: any, index: number) => (
              <div key={event._id}>
                {event.name && (
                  <Link href={`/event/${promoter.events[index]}`}>
                    {" "}
                    <p>{event.name}</p>
                  </Link>
                )}
                {event.link && <Link href={event.link}>{event.link}</Link>}
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}
