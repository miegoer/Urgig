"use client";

import mockUsers from "@/mockData/user";
import Link from "next/link";
import Image from "next/image";
import Edit from "/public/edit-content-icon.png";
import { Ubuntu } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./page.css";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { getUser } from "@/app/utils/userUtils";
import { User } from "@/types/user";
import clsx from "clsx";

const StartChat = "/startchat-icon.png";
const Connect = "/connect-icon.png";
const Spotify = "/spotify-icon.png";
const Instagram = "/ig-icon.png";
const Tiktok = "/tiktok-icon.png";
const Youtube = "/youtube-icon.png";
const DJFrankenstein = "/mockUsers/DJFrankenstein.png";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

const baseRoute = "/myprofile";

interface profileLink {
  name: string;
  href: string;
}

const profileLinks: profileLink[] = [
  { name: "Bio", href: `${baseRoute}` },
  { name: "Fan Base", href: `${baseRoute}/fanbase` },
  { name: "Events", href: `${baseRoute}/events` },
  { name: "Media", href: `${baseRoute}/media` },
];

interface userTag {
  name: string;
  color: string;
}

// TO DO: refactor to minimise repetitive, create function to find placement of icons depending on how many social accounts linked.

export default function MyProfile() {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useTalkSession();
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      //this is iife
      if (!userId) return;
      setUser(await getUser(userId));
    })();
  }, [userId]); // Dependency array uses userId to load only after context is loaded (and userId doesn't change so it's just once)

  return (
    <>
      <div
        id="1stcol"
        style={{ gridColumn: "1 / span 3", gridRow: "2 / span 10" }}
        className="h-[630px] w-[500px] relative"
      >
        {user?.profileDetails?.profilePicture && (
          <Image
            src={user.profileDetails.profilePicture}
            width={660}
            height={530}
            alt="mock profile photo"
            className="h-[100%] w-[100%] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] -ml-5 rounded-r-[50%]"
          />
        )}
        <div className="h-[80px] px-5 flex flex-col top-[82%] inline-flex z-5 absolute bg-[rgba(0,0,0,0.7)]">
          <div
            className={`z-10 py-2.5 rounded-[3px] tracking-[1.5px] text-[white] ${ubuntu.className} text-2xl`}
          >
            {user ? user.name : ""}
          </div>
          <span className="text-sm italic -mt-2 text-center ${ubuntu.className}">
            {user ? user.location : ""}
          </span>
        </div>
        <Image
          src={StartChat}
          width={28}
          height={28}
          alt="Chat button"
          className="w-[28px] h-[28px] absolute top-[40px] left-[78%] hover:scale-[1.2] transition-all duration-200"
        />
        <Image
          src={Connect}
          width={28}
          height={28}
          alt="Connect button"
          className="w-[28px] h-[28px] absolute top-[120px] left-[90%] hover:scale-[1.2] transition-all duration-200"
        />
        <Image
          src={Spotify}
          width={28}
          height={28}
          alt="Spotify button"
          className="w-[28px] h-[28px] absolute top-[220px] left-[96%] hover:scale-[1.2] transition-all duration-200"
        />
        <Image
          src={Instagram}
          width={28}
          height={28}
          alt="Instagram button"
          className="w-[28px] h-[28px] absolute top-[330px] left-[98%] hover:scale-[1.2] transition-all duration-200"
        />
        <Image
          src={Youtube}
          width={28}
          height={28}
          alt="YouTube button"
          className="w-[28px] h-[28px] absolute top-[440px] left-[95%] hover:scale-[1.2] transition-all duration-200"
        />
        <Image
          src={Tiktok}
          width={28}
          height={28}
          alt="Tiktok button"
          className="w-[30px] h-[30px] absolute top-[545px] left-[82%] hover:scale-[1.2] transition-all duration-200"
        />
      </div>
      <div
        id="2ndcol"
        style={{ gridColumn: "4 / span 4", gridRow: "1 / span 4" }}
        className="h-[660px] w-[480px]"
      >
        <div
          id="about"
          className={`z-10 relative w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
        >
          <span className="inline-flex text-[11px] tracking-[1px] uppercase mr-0 mt-[1px] px-4 mb-[18px] rounded-[3px] text-[black] bg-[white]">
            About
          </span>
          {user?.profileDetails?.aboutMe && (
            <span className="block rounded-[10px]">{user.profileDetails.aboutMe}</span>
          )}
        </div>
        <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
        <div
          id="details"
          className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
        >
          <span className="inline-flex text-[11px] tracking-[1px] uppercase px-4 mr-0 mb-[18px] rounded-[3px] text-[black] bg-[white]">
            Details
          </span>
          <table className={`${ubuntu.className} m-auto`}>
            <tbody>
              <tr>
                <td>Members</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Unplugged</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Covers</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Originals</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
        <div
          id="genres"
          className={`z-10 w-[90%] mt-1 p-8 ml-6 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
        >
          <span className="inline-flex text-[11px] tracking-[1px] uppercase mr-0 mt-[1px] px-4 mb-[16px] rounded-[3px] text-[black] bg-[white]">
            Genres
          </span>
          <div>
            {user?.profileDetails?.genre &&
              user.profileDetails.genre.map((tag) => (
                <span className="inline-flex m-1.5 py-2 px-4 rounded-[30px] bg-[black]" key={tag}>
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div
        id="3rdcol"
        style={{ gridColumn: "8 / span 3", gridRow: "2 / span 8" }}
        className="z-10 w-[160px] ml-[70px]"
      >
        <Link href="/booknow">
          <div className="w-[100%] bg-[#20202A] my-[60px] p-4 rounded-[2px] text-center tracking-[3px] text-[#ccff69] text-xs border-2 border-solid border-[#ccff69] uppercase transition-all duration-200 pulse-button">
            Book Now
          </div>
        </Link>
        {profileLinks.map((link) => (
          <Link href={link.href}>
            <div
              className={clsx(
                "z-15 w-[100%] my-[60px] p-4 rounded-[2px] text-center tracking-[3px] text-xs border border-solid border-[white] uppercase transition-all duration-200",
                { "z-100 bg-[white] text-[#20202d]": pathname === link.href },
                "hover:bg-[white] hover:text-[black] hover:scale-110"
              )}
            >
              {link.name}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
