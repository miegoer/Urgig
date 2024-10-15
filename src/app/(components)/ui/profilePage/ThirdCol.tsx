import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { getUser, isPublic } from "@/app/utils/userUtils";
import { User } from "@/types/user";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
//

interface profileLink {
  name: string;
  href: string;
}

interface Props {
  sessionUser: User;
}
//
export default function ThirdCol({ sessionUser }: Props) {
  const [pageUser, setPageUser] = useState<User | null>(null);
  const pathname = usePathname();
  const { id } = useParams();
  const [profileLinks, setProfileLinks] = useState<profileLink[]>([
    { name: "Bio", href: `` },
    { name: "Fan Base", href: `fanbase` },
    { name: "Events", href: `events` },
    { name: "Media", href: `media` },
  ]);

  useEffect(() => {
    const checkUser = async () => {
      if (isPublic(pathname) && id) setPageUser(await getUser(id as string));
      else setPageUser(sessionUser);
    };
    checkUser();
  }, [sessionUser]);

  useEffect(() => {
    const checkUser = () => {
      let baseRoute = getBaseRoute(pathname, pageUser!._id);
      setProfileLinks([
        { name: "Bio", href: `${baseRoute}` },
        { name: "Fan Base", href: `${baseRoute}fanbase` },
        { name: "Events", href: `${baseRoute}events` },
        { name: "Media", href: `${baseRoute}media` },
      ]);
    };
    checkUser();
  }, [pageUser]);

  return (
    <>
      {isPublic(pathname) && (
        <Link href="/booknow">
          <div className="w-[100%] bg-[#20202A] my-[60px] p-4 rounded-[2px] text-center tracking-[3px] text-[#ccff69] text-xs border-2 border-solid border-[#ccff69] uppercase transition-all duration-200 pulse-button">
            Book Now
          </div>
        </Link>
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
    </>
  );
}

function getBaseRoute(pathname: string, userId: string) {
  if (pathname.includes("/myprofile/")) return "/myprofile/";
  if (pathname.includes(`/a/${userId}/`)) return `/a/${userId}/`;
  if (pathname.includes(`/p/${userId}/`)) return `/p/${userId}/`;
  return null;
}
