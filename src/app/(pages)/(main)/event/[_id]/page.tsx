"use client";
import "./page.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Ubuntu } from "next/font/google";
import { Event } from "@/types/event";



interface userTag {
  name: string;
  color: string;
}

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

interface genreTag {
  name: string;
  color: string;
}




type eventProps = {
  event: Event
} 


export default function EventProfile( ) {

  const params = useParams();

  const [event, setEvent] = useState<Event>({
    name: "",
    location: "",
    date: new Date(),
    genre: [] as string[],
    duration: 1,
    maxCapacity: 100,
    bannerURL: undefined,
    link: undefined,
    promoterId: "",
  })

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/events/${params._id}`);
        const data = await response.json();
        data.genre = data.expectedGenre
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params]);

    return (
        <>
            <div className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}>
            {/* {mockUsers[0].profileDetails.aboutMe} */}
                <span className="inline-flex text-[11px] tracking-[1px] uppercase mr-0 mt-[1px] px-4 mb-[18px] rounded-[3px] text-[black] bg-[white]">About</span>
                <span className="block">
                DJ Frankenstein is the best DJ you've never heard of. He was constructed with the remains of five legendary DJs across the world, who all perished under mysterious circumstances. All hail the Undead!
                </span>
            </div>
            <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
            <div className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}>
                <span className="inline-flex text-[11px] tracking-[1px] uppercase px-4 mr-0 mb-[18px] rounded-[3px] text-[black] bg-[white]">Details</span>
                <table className={`${ubuntu.className} m-auto`}><tbody>
                    <tr><td>Artists</td><td>32</td></tr>
                    <tr><td>Event Duration</td><td>3</td></tr>
                    <tr><td>Editions</td><td>12</td></tr>
                    <tr><td>Location</td><td>Berlin</td></tr>
                </tbody></table>
            </div>
            <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
            <div className={`z-10 w-[90%] mt-1 p-8 ml-6 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}>
            {/* {mockUsers[0].profileDetails.aboutMe} */}
                <span className="inline-flex text-[11px] tracking-[1px] uppercase mr-0 mt-[1px] px-4 mb-[16px] rounded-[3px] text-[black] bg-[white]">Genres</span>
                <div>
                {/* {event.genre.map((genre, index) => (
                <span className="inline-flex bg-[#23d5cd] m-1.5 py-2 px-4 rounded-[15px]" style={{ background: tag.color }} key={genre[index]}>{genre[index]}</span>
            ))} */}
            
            </div>
            </div>
        </>
    )
  }