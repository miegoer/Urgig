"use client";

import Link from "next/link";
import clsx from "clsx";
const Notifications = "/notifications-bell.png";
const Messages = "/messages-icon.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
const Search = "/search-icon.png";
import React from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";

interface MainNavLink {
  name: string;
  href: string;
  forUser: string;
}

const links: MainNavLink[] = [
  { name: "Dashboard", href: "/dashboard", forUser: "all" },
  { name: "Find Talent", href: "/findtalent", forUser: "promoter" },
  { name: "Find Gigs", href: "/findgigs", forUser: "artist" },
  { name: "Spotlight", href: "/spotlight", forUser: "all" },
  // { name: "Profile", href: "/myprofile", forUser: "all" },
]; // Links in the global Main Nav at the top of the page

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link: MainNavLink) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "text-[#b7c4ff] p-3 uppercase text-[12px] mx-[24px] my-[6px] tracking-[3px] transition-all duration-200",
            { "text-[#ccff69]": pathname === link.href },
            "hover:bg-[#3525de] hover:rounded-[5px]"
          )}
        >
          {link.name}
        </Link>
      ))}
      <Dropdown><DropdownTrigger>
      <span className={clsx(
            "text-[#b7c4ff] p-3 uppercase text-[12px] mx-[24px] my-[6px] tracking-[3px] transition-all duration-200",
            { "text-[#ccff69]": pathname === '/myprofile' || pathname === '/editprofile'},
            "hover:bg-[#3525de] hover:rounded-[5px]")}>
          Profile
        </span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="View" className="text-center bg-[#20202A] p-3 hover:bg-[#3525de] shadow-[0px_4px_5px_#191922] transition-all duration-200">
        <Link key='viewprofile' href='/myprofile'
          className={clsx(
            "text-[#b7c4ff] p-3 uppercase text-[12px] mx-[24px] my-[6px] tracking-[3px] transition-all duration-200",
            { "text-[#ccff69]": pathname === '/myprofile' },
            "hover:rounded-[5px]")}>
          View
        </Link>
        </DropdownItem>
        <DropdownItem key="Edit" className="text-center bg-[#20202A] p-3 hover:bg-[#3525de] rounded-[0px_0px_20px_20px] shadow-[0px_4px_5px_#191922] transition-all duration-200 ">
          <Link key='editprofile' href='/editprofile'
            className={clsx(
              "text-[#b7c4ff] p-3 uppercase text-[12px] mx-[24px] my-[6px] tracking-[3px]",
              { "text-[#ccff69]": pathname === '/editprofile' },
              "hover:rounded-[5px]")}>
            Edit
          </Link>
        </DropdownItem>
      </DropdownMenu></Dropdown>
      <Image
        src={Notifications}
        alt="notifications bell"
        height={20}
        width={20}
        className="ml-5 mr-6"
      />
      <input
        type="text"
        className="text-[white] text-center ml-[30px] mr-2.5 my-0 px-2.5 py-1 rounded-[20px] border-[none] w-[12%] h-[70%] text-xs"
        placeholder="Search"
        style={{
          background: "linear-gradient(11deg, rgba(52, 52, 52, 1) 0%, rgba(100, 100, 100, 1) 100%)",
        }}
      />
      <Image
        src={Search}
        height={20}
        width={20}
        id="search-icon"
        alt="search icon"
        className="h-[16px] w-[16px] mr-8"
      />
    </>
  );
}
