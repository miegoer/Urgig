import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { getUser, isPublic } from "@/app/utils/userUtils";
import { User } from "@/types/user";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

  const { id } = useParams();
  const [profileLinks, setProfileLinks] = useState<profileLink[]>([
    { name: "Bio", href: `` },
    { name: "Fan Base", href: `fanbase` },
    { name: "Events", href: `events` },
    { name: "Media", href: `media` },
  ]);

  useEffect(() => {
    const checkUser = async () => {
      if (isPublic(pathname) && id) {
        const user = await getUser(id as string);

        if (!isValidProfile(pathname, user.typeOfAccount)) {
          const link = `${redirectToValidProfile(user.typeOfAccount)}/${id}`;
          router.push(link);
          return;
        }
        setPageUser(user);
      } else setPageUser(sessionUser);
    };
    checkUser();
  }, [sessionUser, router]);

  useEffect(() => {
    const checkUser = () => {
      if (!pageUser) return;
      let baseRoute = getBaseRoute(pathname, pageUser._id);

      setProfileLinks([
        { name: "Bio", href: `${baseRoute}` },
        { name: "Fan Base", href: `${baseRoute}/fanbase` },
        { name: "Events", href: `${baseRoute}/events` },
        { name: "Media", href: `${baseRoute}/media` },
      ]);
    };
    checkUser();
  }, [pageUser, pathname]);

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
  if (pathname.includes("/myprofile")) return "/myprofile";
  if (pathname.includes(`/a/${userId}`)) return `/a/${userId}`;
  if (pathname.includes(`/p/${userId}`)) return `/p/${userId}`;
  return "";
}

function isValidProfile(pathname: string, typeOfAccount: string) {
  if (typeOfAccount === "artist" && pathname.includes("/a/")) return true;
  if (typeOfAccount === "promoter" && pathname.includes("/p/")) return true;
  return false;
}
function redirectToValidProfile(typeOfAccount: string) {
  if (typeOfAccount === "artist") return "/a";
  if (typeOfAccount === "promoter") return "/p";
}
