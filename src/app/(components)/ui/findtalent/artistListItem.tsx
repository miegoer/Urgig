"use client";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/types/user";
import frankenstein from "@/../public/mockUsers/DJFrankenstein.png";
import { useEffect, useState } from "react";
const LocationPin = "/location-icon.png";
import { Event } from "@/types/event";
import { Ubuntu } from "next/font/google";

//

type ArtistListItemProps = {
  artist: User;
};

type eventArtist = {
  name: string;
  date: Date;
};

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

export default function ArtistListItem({ artist }: ArtistListItemProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [nextEvent, setNextEvent] = useState<Event | null>()
  // const [artistPastEvents, setPastArtistEvents] = useState<ArtistEvent[]>([]);

  const formatDate = (date:Date) => {
    const dateChange = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric'};
    const formattedDate = dateChange.toLocaleDateString('en-GB', options);
    return formattedDate;
  }

  const getSoonestEvent = (array:[]) => {
    const currentDate = new Date();
    const upcomingEvents = array.filter(event => new Date(event.date) > currentDate);
    upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  };

  useEffect(() => {
    if (artist && artist._id) {
      const fetchEvents = async () => {
        try {
          const response = await fetch(`/api/users/${artist._id}/events`);
          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }
          const data = await response.json();
          if (data.length > 3) {
            data.slice(0, 3);
          }
          setEvents(data);
          const next = getSoonestEvent(data);
          setNextEvent(next);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
      fetchEvents();
    }
  }, [artist]);

  return (
    <>
      <div className="shadow-[0px_4px_5px_#191922] h-[130px] flex flex-row rounded-[20px] bg-[#292346] mb-[20px] p-3 w-[900px]">
        <div className="w-[150px] flex flex-col ">
          <Link href={`/a/${artist._id}`} className="self-center">
            {artist.profileDetails && artist.profileDetails.profilePicture ? (
              <img
                src={artist.profileDetails.profilePicture}
                alt="Artist's profile Photo"
                width={100}
                height={100}
                className="rounded-[5px] shadow-[2px_4px_4px_#191922] object-cover"
              />
            ) : (
              <img
                src={"@/../public/mockUsers/DJFrankenstein.png"}
                alt="Artist's profile photo"
                width={100}
                height={100}
                className="rounded-[5px] shadow-[2px_4px_4px_#191922] object-cover"
              />
            )}
          </Link>
        </div>

        <div className="flex flex-col p-2 w-[280px] mr-[10px] text-center">
            <span className="rounded-[5px] p-1 inline-block flex-wrap text-[14px] tracking-[2px] uppercase mt-[14px] text-[#ccff69] mb-[8px] text-center">{artist.name}</span>
            <div className="flex flex-wrap p-2 tracking-[1px] text-[#928dd3] justify-center items-center text-xs">
            {artist.location}
            </div>
          </div>

        <div className="flex flex-col items-center text-center justify-center w-[280px]" style={{borderLeft: '1px solid black'}}>
        {events && nextEvent ? (
            <Link href={`/events/${nextEvent._id}`}>
              <span className={`text-[13px] text-[#f79c0e] w-[230px] text-nowrap tracking-[1.5px] mb-[8px] text-center ${ubuntu.className}`}>
                {nextEvent.name}
              </span>
              <span className="italic block text-xs tracking-[1px] mt-[6px] text-center">
                {formatDate(nextEvent.date)}
              </span>
            </Link>
          ) : null}

          {/* {events.map((event) => (
            <Link href={`/events/${event._id}`}>
              {" "}
              <span className="text-[10px] w-[230px] text-nowrap tracking-[1.5px] uppercase  mb-[8px] text-center ">
                {event.name}
              </span>
            </Link>
          ))} */}
        </div>
        <div //events number
          className="flex flex-col w-[80px] items-center py-3 px-[15px] justify-center" style={{borderLeft: '1px solid black'}}>
          <span className="block text-[15px] tracking-[1.5px] uppercase ">
            {artist.events!.length}
          </span>
          <span className="block text-[10px] tracking-[1.5px] uppercase mt-[1px] mb-[8px] text-center">
            Events
          </span>
        </div>

        <div className="flex flex-row flex-wrap w-[210px] text-center justify-around py-2 px-5 items-center overflow-y-auto" style={{borderLeft: '1px solid black'}}>
          {artist.profileDetails?.genre.map((genre, index) => (
            <span className="inline px-2 py-1 mx-[10px] text-[10px] bg-[black] text-[#ccff69] rounded-[8px] text-[#ccff69] tracking-[1px] uppercase">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

{
  /* <div
  className="flex flex-col w-[80px] justify-between py-3 px-5 -mr-5"
  style={{ borderLeft: "1px solid black" }}>
  <Image src="/save-icon.png" width={25} height={25} alt="save icon" />
  <Image
    src="/share-icon.png"
    width={25}
    height={25}
    alt="share icon"
  />
</div> */
}

// const socialIcons = [
//   { profilePicture: "/spotify-icon.png", alt: "Spotify Icon" },
//   { profilePicture: "/tiktok-icon.png", alt: "TikTok Icon" },
//   { profilePicture: "/youtube-icon.png", alt: "YouTube" },
// ];
