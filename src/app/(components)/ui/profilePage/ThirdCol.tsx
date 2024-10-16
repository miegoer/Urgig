"use client";

import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { getUser, isPublic } from "@/app/utils/userUtils";
import { User } from "@/types/user";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BookNow } from "@/app/(components)/ui/a/booknow";
//

interface profileLink {
  name: string;
  href: string;
}

interface Props {
  pageOwnerUser: User | null;
}
//
export default function ThirdCol({ pageOwnerUser }: Props) {
  const [pageUser, setPageUser] = useState<User | null>(null);
  const [openBooking, setOpenBooking] = useState(false);
  const pathname = usePathname();

  const [profileLinks, setProfileLinks] = useState<profileLink[]>([
    { name: "Bio", href: `` },
    { name: "Fan Base", href: `fanbase` },
    { name: "Events", href: `events` },
    { name: "Media", href: `media` },
  ]);

  useEffect(() => {
    const checkUser = () => {
      if (!pageOwnerUser) return;
      let baseRoute = getBaseRoute(pathname, pageOwnerUser._id);

      setProfileLinks([
        { name: "Bio", href: `${baseRoute}` },
        { name: "Fan Base", href: `${baseRoute}/fanbase` },
        { name: "Events", href: `${baseRoute}/events` },
        { name: "Media", href: `${baseRoute}/media` },
      ]);
    };
    checkUser();
  }, [pageOwnerUser, pathname]);

  return (
    <>
      {isPublic(pathname) && (
        <div>
          <div style={{ gridColumn: "8 / span 3", gridRow: "2 / span 8" }} className="w-[160px]">
            <button
              onClick={() => setOpenBooking(true)}
              className="w-[100%] bg-[#20202A] mt-[60px] p-4 rounded-[2px] text-center tracking-[3px] text-[#ccff69] text-xs border-2 border-solid border-[#ccff69] uppercase transition-all duration-200 pulse-button"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
      {profileLinks.map((link) => (
        <Link href={link.href} key={link.name}>
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

      {openBooking && (
        <div
          className="fixed w-full h-full flex items-center justify-center z-[1000] backdrop-blur-[8px] left-0 top-0"
          style={{ background: "rgba(0, 0, 0, 0.7)" }}
        >
          <BookNow setOpenBooking={setOpenBooking} />
        </div>
      )}
    </>
  );
}

function getBaseRoute(pathname: string, userId: string) {
  if (pathname.includes("/myprofile")) return "/myprofile";
  if (pathname.includes(`/a/${userId}`)) return `/a/${userId}`;
  if (pathname.includes(`/p/${userId}`)) return `/p/${userId}`;
  return "";
}
