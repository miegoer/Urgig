"use client";

import TalentSearch from "@/app/(components)/ui/findtalent/search";
import ArtistListItem from "@/app/(components)/ui/findtalent/_artistListItem";
import { MockArtists } from "@/mockData/artistList";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function FindTalent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "auto 1fr",
      }}
    >
      {/* Sidebar */}
      <div
        style={{ gridColumn: "1 / span 2", gridRow: "2 / span 8" }}
        className="w-[270px] mx-[30px] relative"
      >
        <Link href="/findtalent">
          <div
            className={clsx(
              "z-8 absolute py-3 px-5 rounded-[20px_20px_0px_0px] text-xs bg-[#2a2054] w-[88px] tracking-[1px] h-[80px] shadow-[0px_0px_0px_#272525]",
              { "bg-[#332960] z-10": pathname === "/findtalent" },
              "hover:bg-[#3525de]"
            )}
          >
            General
          </div>
        </Link>
        {/* <Link href="/findtalent/edm">
                    <div
                        className={clsx(
                            "z-8 absolute py-3 px-5 rounded-[20px_20px_0px_0px] ml-[88px] text-xs bg-[#2a2054] w-[70px] tracking-[1px] h-[80px] shadow-[0px_0px_0px_#272525]",
                            { "bg-[#332960] z-10": pathname === '/findtalent/edm' },
                            "hover:bg-[#3525de]"
                        )}
                    >
                        EDM
                    </div>
                </Link> */}
        <div className="z-20 absolute w-full">{children}</div>
      </div>
      {/* Main Content with Custom Scrollbar */}
      <div
        style={{ gridColumn: "3 / span 8", gridRow: "2 / span 8" }}
        className={`h-[600px] mt-[10px] overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-black-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-[#332960]
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
      >
        {MockArtists.map((artist) => (
          <ArtistListItem
            key={artist.name}
            name={artist.name}
            profilePhoto={artist.profilePhoto}
            tags={artist.tags}
            fanBase={artist.fanBase}
            numberOfEvents={artist.numberOfEvents}
          />
        ))}
      </div>
    </div>
  );
}
