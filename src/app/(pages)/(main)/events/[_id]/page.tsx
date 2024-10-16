"use client";
import "./page.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Ubuntu } from "next/font/google";
import { Event } from "@/types/event";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";

interface userTag {
  name: string;
  color: string;
}

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

type eventProps = {
  event: Event;
};

export default function EventProfile() {
  const params = useParams();
  const { userId } = useTalkSession();

  const [event, setEvent] = useState<Event>({
    name: "",
    location: "",
    date: new Date(),
    genre: [] as string[],
    duration: 1,
    maxCapacity: 100,
    profilePicture: undefined,
    link: undefined,
    promoterId: "",
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/events/${params._id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params]);

  return (
    <>
      <div className="flex flex-col justify-center w-[100%] mx-[20%]">
        <div className={`z-10 mt-1 py-8 text-center tracking-[1.5px] text-[white] text-sm`}>
          <span className="inline-flex text-[11px] tracking-[1px] uppercase px-4 mb-[18px] rounded-[3px] text-[black] bg-[white]">
            About
          </span>
          <span className="block">
            Welcome to {event.name}, the ultimate celebration of electronic music! Set on a stunning
            beachfront, this three-day festival brings together the biggest names in for an
            unforgettable sonic experience. With five massive stages, cutting-edge visuals, and
            breathtaking pyrotechnics, ElectroWave Fest immerses you in a world of sound and light.
            Whether you're a hardcore raver or just love great vibes, ElectroWave Fest is where
            music, technology, and nature collide for an epic journey you won't want to miss!
          </span>
        </div>
        <div className="border-t w-[300px] h-0 self-center mt-4"></div>
        <div className={`z-10 mt-4 rounded-[2px] text-center text-[white] text-sm`}>
          <span className="inline-flex text-[11px] tracking-[1px] uppercase px-4  mb-[18px] rounded-[3px] text-[black] bg-[white]">
            Details
          </span>
          <table className={`${ubuntu.className} m-auto`}>
            <tbody>
              <tr>
                <td>Artists</td>
                <td>32</td>
              </tr>
              <tr>
                <td>Event Duration</td>
                <td>{event.duration}</td>
              </tr>
              <tr>
                <td>Editions</td>
                <td>12</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>Berlin</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border-t w-[300px] h-0 self-center mt-4"></div>
        <div
          className={`z-10 mx-[20%] rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
        >
          <span className="inline-flex mt-4 text-[11px] tracking-[1px] uppercase px-4 mb-[16px] rounded-[3px] text-[black] bg-[white]">
            Genres
          </span>
          <div>
            {event.genre.map((tag) => (
              <span className="inline-flex m-1.5 py-2 px-4 rounded-[30px] bg-[black]" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
