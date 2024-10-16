"use client";
import { usePageOwnerUser } from "@/app/(context)/PageOwnerUserContext";
import { getUser, isPublic } from "@/app/utils/userUtils";
import { User } from "@/types/user";
import { Ubuntu } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const StartChat = "/startchat-icon.png";
const Connect = "/connect-icon.png";
const Spotify = "/spotify-icon.png";
const Instagram = "/ig-icon.png";
const Tiktok = "/tiktok-icon.png";
const Youtube = "/youtube-icon.png";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});
//

//
export default function FirstCol() {
  const pageOwnerUser = usePageOwnerUser();
  const [pageOwner, setPageOwner] = useState<User | null>(null);
  const pathname = usePathname();
  const { id } = useParams();

  useEffect(() => {
    const checkUser = async () => {
      if (!pageOwnerUser) return;

      if (isPublic(pathname) && id) setPageOwner(await getUser(id as string));
      else setPageOwner(pageOwnerUser);
    };
    checkUser();
  }, [pageOwnerUser]);

  //TODO: refactor to minimise repetitive, create function to find placement of icons depending on how many social accounts linked.
  const imageIcon = (imgSrc: string, positionClasses: string, socialURL: string | null = null) => {
    return socialURL ? (
      <Link href={socialURL}>
        <Image
          src={imgSrc}
          width={28}
          height={28}
          alt="Chat button"
          className={`w-[28px] h-[28px] absolute ${positionClasses} hover:scale-[1.2] transition-all duration-200`}
        />
      </Link>
    ) : (
      <Image
        src={imgSrc}
        width={28}
        height={28}
        alt="Chat button"
        className={`w-[28px] h-[28px] absolute ${positionClasses} grayscale hover:scale-[1.2] transition-all duration-200`}
      />
    );
  };

  return (
    <>
      {pageOwner?.profileDetails?.imageURL && (
        <Image
          src={pageOwner.profileDetails.imageURL}
          width={660}
          height={530}
          alt="mock profile photo"
          className="h-[100%] w-[100%] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] -ml-5 rounded-r-[50%]"
        />
      )}
      <div className="h-[80px] px-5 flex flex-col top-[82%] inline-flex z-5 absolute bg-[rgba(0,0,0,0.7)]">
        <div className="z-10 py-2.5 rounded-[3px] tracking-[1.5px] text-[white] ${ubuntu.className} text-2xl">
          {pageOwner ? pageOwner.name : ""}
        </div>
        <span className="text-sm italic -mt-2 text-center ${ubuntu.className}">
          {pageOwner ? pageOwner.location : ""}
        </span>
      </div>
      <div>
        {/* {imageIcon(StartChat, "top-[40px] left-[78%]", "")}
          {imageIcon(Connect, "top-[120px] left-[90%]", "")} */}
        {imageIcon(
          Spotify,
          "top-[220px] left-[96%]",
          pageOwner?.profileDetails?.socialLinks?.spotify
        )}
        {imageIcon(
          Instagram,
          "top-[330px] left-[98%]",
          pageOwner?.profileDetails?.socialLinks?.instagram
        )}
        {imageIcon(
          Youtube,
          "top-[440px] left-[95%]",
          pageOwner?.profileDetails?.socialLinks?.youtube
        )}
        {imageIcon(
          Tiktok,
          "top-[545px] left-[82%]",
          pageOwner?.profileDetails?.socialLinks?.tiktok
        )}
      </div>
    </>
  );
}
