import { User } from "@/types/user";
import { Ubuntu } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const StartChat = "/startchat-icon.png";
const Connect = "/connect-icon.png";
const Spotify = "/spotify-icon.png";
const Instagram = "/ig-icon.png";
const Tiktok = "/tiktok-icon.png";
const Youtube = "/youtube-icon.png";
//
interface Props {
  user: User;
}

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

//
export default function FirstCol({ user }: Props) {
  const pathname = usePathname();

  const socials = user?.profileDetails?.socialLinks;

  const imageIcon = (imgSrc: string, positionClasses: string, socialURL: string = "") => {
    return (
      <Link href={socialURL}>
        <Image
          src={imgSrc}
          width={28}
          height={28}
          alt="Chat button"
          className={`w-[28px] h-[28px] absolute ${positionClasses} ${
            socialURL ? "" : "grayscale"
          } hover:scale-[1.2] transition-all duration-200`}
        />
      </Link>
    );
  };

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
        <div>
          {/* {imageIcon(StartChat, "top-[40px] left-[78%]", "")}
          {imageIcon(Connect, "top-[120px] left-[90%]", "")} */}
          {imageIcon(Spotify, "top-[220px] left-[96%]", socials?.spotify)}
          {imageIcon(Instagram, "top-[330px] left-[98%]", socials?.instagram)}
          {imageIcon(Youtube, "top-[440px] left-[95%]", socials?.youtube)}
          {imageIcon(Tiktok, "top-[545px] left-[82%]", socials?.tiktok)}
        </div>
      </div>
    </>
  );
}
