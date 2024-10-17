"use client";

import { useParams } from "next/navigation";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Event } from "@/types/event";

import Image from "next/image";
const festHeroIMG = "/festHeroIMG.png";
const StartChat = "/startchat-icon.png";
const Connect = "/connect-icon.png";
const Instagram = "/ig-icon.png";
const Youtube = "/youtube-icon.png";
import { Ubuntu } from "next/font/google";
import clsx from "clsx";
import { randomBytes } from "crypto";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});
interface profileLink {
  name: string;
  href: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const { userId } = useTalkSession();

  const [event, setEvent] = useState<Event>({
    _id: "",
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

  const baseRoute = `/events/${event._id}`;

  const profileLinks: profileLink[] = [
    { name: "Event", href: `${baseRoute}` },
    { name: "Promoter", href: `/p/${event.promoterId}` },
    // { name: "Promoter", href: `${baseRoute}/promoter/${event.promoterId}` },
    {
      name: "Oficial Site",
      href: event.link ? event.link : `https://${event.name}.com`,
    }, //placeholder
    { name: "Info", href: `${baseRoute}/eventInfo` },
    { name: "Bookings", href: `${baseRoute}/bookings` },
  ];

  return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <div
          style={{ gridColumn: "1 / span 3", gridRow: "2 / span 10" }}
          className="h-[630px] w-[500px] relative"
        >
          <Image
            src={festHeroIMG}
            width={760}
            height={530}
            alt="mock profile photo"
            className="h-[100%] w-[67%] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] -ml-5 object-cover"
          />
          <div className="bg-gradient-to-l from-black/50 to-black/90  h-[80px] px-5 flex flex-col top-[82%] z-5 absolute ">
            <div
              className={`z-10 py-2.5 rounded-[3px] tracking-[1.5px] text-[white] ${ubuntu.className} text-2xl`}
            >
              {event.name}
            </div>
            <span className="text-sm italic -mt-2 text-center ${ubuntu.className}">
              {event.location}
            </span>
          </div>
          <Image
            src={StartChat}
            width={28}
            height={28}
            alt="Chat button"
            className="w-[28px] h-[28px] absolute top-[40px] left-[65%] hover:scale-[1.2] transition-all duration-200"
          />
          <Image
            src={Connect}
            width={28}
            height={28}
            alt="Connect button"
            className="w-[28px] h-[28px] absolute top-[120px] left-[65%] hover:scale-[1.2] transition-all duration-200"
          />
          <Image
            src={Youtube}
            width={28}
            height={28}
            alt="Spotify button"
            className="w-[28px] h-[28px] absolute top-[220px] left-[65%] hover:scale-[1.2] transition-all duration-200"
          />
          <Image
            src={Instagram}
            width={28}
            height={28}
            alt="Instagram button"
            className="w-[28px] h-[28px] absolute top-[330px] left-[65%] hover:scale-[1.2] transition-all duration-200"
          />
        </div>
        <div
          style={{ gridColumn: "3 / span 4", gridRow: "1 / span 4" }}
          className="h-[660px] w-[480px]"
        >
          {children}
        </div>
        <div
          style={{ gridColumn: "8 / span 3", gridRow: "2 / span 8" }}
          className="w-[160px] ml-[70px]"
        >
          {event.promoterId === userId
            ? profileLinks.map((link) => (
                <Link href={link.href} key={link.name}>
                  <div
                    className={clsx(
                      "w-[100%] my-[60px] p-4 rounded-[2px] text-center tracking-[3px] text-xs border border-solid border-[white] uppercase transition-all duration-200",
                      {
                        "bg-[white] text-[#20202d] font-bold ":
                          pathname === link.href,
                        "text-[white]": pathname !== link.href,
                      },
                      "hover:bg-[white] hover:text-[black] hover:scale-110"
                    )}
                  >
                    {link.name}
                  </div>
                </Link>
              ))
            : profileLinks.slice(0, -1).map((link) => (
                <Link href={link.href} key={link.name}>
                  <div
                    className={clsx(
                      "w-[100%] my-[60px] p-4 rounded-[2px] text-center tracking-[3px] text-xs border border-solid border-[white] uppercase transition-all duration-200",
                      {
                        "bg-[white] text-[#20202d] font-bold ":
                          pathname === link.href,
                        "text-[white]": pathname !== link.href,
                      },
                      "hover:bg-[white] hover:text-[black] hover:scale-110"
                    )}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
        </div>
      </div>
  );
}
