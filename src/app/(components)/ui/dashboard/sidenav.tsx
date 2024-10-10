"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";
// import Dashboard from "/dashboard-icon.png";
// import Payments from "/earnings-icon.png";
// import Settings from "/settings-icon.png";
// import Calendar from "/calendar-icon.png";
// import Analytics from "/analytics-icon.png";
// import Create from "/create-icon.png";
// import Account from "/profile-icon.png";
// import Contracts from "/contracts-icon.png";
import "./dashboard-ui.css";

const baseRoute = "/dashboard";

interface sideNavLink {
  icon: string;
  href: string;
  alt: string;
}

const sideNavLinks: sideNavLink[] = [
  { icon: "/dashboard-icon.png", href: `${baseRoute}`, alt: "Dashboard Icon" },
  { icon: "/create-icon.png", href: `${baseRoute}/create`, alt: "Create Icon" },
  { icon: "/earnings-icon.png", href: `${baseRoute}/payments`, alt: "Payments Icon" },
  { icon: "/analytics-icon.png", href: `${baseRoute}/analytics`, alt: "Analytics Icon" },
  { icon: "/contracts-icon.png", href: `${baseRoute}/contracts`, alt: "Contracts Icon" },
  { icon: "/profile-icon.png", href: `${baseRoute}/account`, alt: "Account Icon" },
  { icon: "/settings-icon.png", href: `${baseRoute}/settings`, alt: "Settings Icon" },
]; // Icons in the Dashboard's SideNav. Not yet linked to pages.

export default function SideNav() {
  const pathname = usePathname();
  return (
    <div className="col-[col-start_1_/_span_1] row-[2_/_span_8] w-[55px] shadow-[0px_0px_0px_#272525] ml-5 mt-0 pl-2.5 pr-0 pt-0 pb-[35px] rounded-[20px]">
      {sideNavLinks.map((link) => (
        <Link key={link.alt} href={link.href}>
          <Image
            src={link.icon}
            alt={link.alt}
            width={35}
            height={35}
            className={clsx(
              "my-[42px] p-[5px] transition-all duration-200",
              { "bg-[#3525de] rounded-[10px]": pathname === link.href },
              "hover:bg-[#3525de] hover:rounded-[10px] hover:h-[35px]"
            )}
          />
        </Link>
      ))}
      {/* <Link key={link.name} href={link.href} className={clsx(
                'text-[#dcff58] p-3 uppercase text-[12px] mx-[24px] my-[6px] tracking-[3px] transition-all duration-200',
                {'text-[#ffc037]': pathname === link.href},
                'hover:bg-[#3525de] hover:rounded-[5px]')}>
                {link.name}
            </Link> */}
    </div>
  );
}
