"use client";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/types/user";
import frankenstein from "@/../public/mockUsers/DJFrankenstein.png";
import { useEffect, useState } from "react";
import { Event } from "@/types/event";

//

type ArtistListItemProps = {
  artist: User;
};

type eventArtist = {
  name: string;
  date: Date;
};

export default function ArtistListItem({ artist }: ArtistListItemProps) {
  const [events, setEvents] = useState<Event[]>([]);
  // const [artistPastEvents, setPastArtistEvents] = useState<ArtistEvent[]>([]);

  useEffect(() => {
    if (artist && artist._id) {
      const fetchEvents = async () => {
        try {
          const response = await fetch(`/api/users/${artist._id}/events`);
          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }
          const data = await response.json();
          if (data.length > 3 ) {
            data.slice(0,3)
          }
          setEvents(data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
      fetchEvents();
    }
  }, [artist]);

  return (
    <>
      <div className="flex flex-row items-center shadow-[0px_4px_5px_#191922] h-[130px] rounded-[20px] bg-[#252531] mb-[20px] p-3">
       
        <div className="w-[150px] flex flex-col ">
          <Link href={`/a/profile/${artist._id}`} className="self-center">
            {artist.profileDetails && artist.profileDetails.profilePicture ? (
              <img
                src={artist.profileDetails.profilePicture}
                alt="Artist's profile Photo"
                width={80}
                height={80}
                className="rounded-[40px] shadow-[2px_4px_4px_#191922] object-cover"
              />
            ) : (
              <img
                src={"@/../public/mockUsers/DJFrankenstein.png"}
                alt="Artist's profile photo"
                width={80}
                height={80}
                className="rounded-[40px] shadow-[2px_4px_4px_#191922] object-cover"
              />
            )}
          </Link>
          <span className="block text-[11px] tracking-[1.5px] uppercase mt-2 mb-[8px] text-center ">
            {artist.name}
          </span>
        </div>

        <div className="w-[1px] bg-black h-[70px] "></div>

        <div //events number
          className="flex flex-col w-[80px] items-center py-3 px-6 justify-center"
        >
          <span className="block text-[15px] tracking-[1.5px] uppercase ] ">
            {artist.events!.length}
          </span>
          <span className="block text-[11px] tracking-[1.5px] uppercase mt-[1px] mb-[8px] text-center">
            Events
          </span>
        </div>

        <div className="w-[1px] bg-black h-[70px] "></div>

        <div className="flex flex-col items-center justify-center w-[280px] h-[100px] ">
          {events.map((event) => (
           <Link href={`/event/${event._id}`}> <span className="text-[10px] w-[230px] text-nowrap tracking-[1.5px] uppercase  mb-[8px] text-center ">
              {event.name}
            </span></Link>
          ))}
        </div>

        <div className="w-[1px] bg-black h-[70px] "></div>

        <div className="flex flex-row flex-wrap w-[200px] text-center justify-around py-2 px-5 items-center">
          {artist.profileDetails?.genre.map((genre, index) => (
            <span
              className="flex flex-row justify-between gap-2 items-center text-[11px]  bg-[black] h-5 text-nowrap text-[#ffa01e] rounded-[20px] p-2 m-1"
              // className="inline px-2 py-1 mx-[10px] mt-2 text-[10px] bg-[black] text-[#ccff69] rounded-[3px] tracking-[1px] uppercase"
              key={genre}
            >
              {genre}
            </span>
          ))}
        </div>

      </div>
    </>
  );
}


{/* <div
  className="flex flex-col w-[80px] justify-between py-3 px-5 -mr-5"
  style={{ borderLeft: "1px solid black" }}>
  <Image src="/save-icon.png" width={25} height={25} alt="save icon" />
  <Image
    src="/share-icon.png"
    width={25}
    height={25}
    alt="share icon"
  />
</div> */}

// const socialIcons = [
//   { imageurl: "/spotify-icon.png", alt: "Spotify Icon" },
//   { imageurl: "/tiktok-icon.png", alt: "TikTok Icon" },
//   { imageurl: "/youtube-icon.png", alt: "YouTube" },
// ];
