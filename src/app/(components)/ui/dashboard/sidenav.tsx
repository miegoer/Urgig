"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import "./dashboard-ui.css";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { useEffect } from "react";

const baseRoute = "/dashboard";

interface sideNavLink {
  icon: string;
  href: string;
  alt: string;
  showFor: string;
}

const sideNavLinks: sideNavLink[] = [
  { icon: "/dashboard-icon.png", href: `${baseRoute}`, alt: "Dashboard Icon", showFor: "both" },
  {
    icon: "/create-icon.png",
    href: `${baseRoute}/create`,
    alt: "Create Icon",
    showFor: "promoter",
  },
  {
    icon: "/earnings-icon.png",
    href: `${baseRoute}/payments`,
    alt: "Payments Icon",
    showFor: "both",
  },
  {
    icon: "/analytics-icon.png",
    href: `${baseRoute}/analytics`,
    alt: "Analytics Icon",
    showFor: "both",
  },
  {
    icon: "/contracts-icon.png",
    href: `${baseRoute}/contracts`,
    alt: "Contracts Icon",
    showFor: "both",
  },
  { icon: "/profile-icon.png", href: `${baseRoute}/account`, alt: "Account Icon", showFor: "both" },
  {
    icon: "/settings-icon.png",
    href: `${baseRoute}/settings`,
    alt: "Settings Icon",
    showFor: "both",
  },
];

export default function SideNav() {
  const { userId, userType } = useTalkSession();
  let recievedType: string;

  useEffect(() => {
    if (userId && userType) {
      recievedType = userType;
    }
  }, [userId, userType]);

  const pathname = usePathname();
  return (
    <div className="col-[col-start_1_/_span_1] row-[2_/_span_8] shadow-[0px_0px_0px_#272525] ml-10 pl-3 pt-0 pb-[35px] rounded-[20px]">
      {sideNavLinks.map(
        (link) =>
          (userType === link.showFor || link.showFor === "both") && (
            <Link key={link.alt} href={link.href}>
              <Image
                src={link.icon}
                alt={link.alt}
                width={38}
                height={38}
                className={clsx(
                  "my-[42px] p-[5px] transition-all duration-200",
                  { "bg-[#3525de] rounded-[10px]": pathname === link.href },
                  "hover:bg-[#3525de] hover:rounded-[10px] hover:h-[38px]"
                )}
              />
            </Link>
          )
      )}
    </div>
  );
}
