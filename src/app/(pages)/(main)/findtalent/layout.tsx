'use client'

import TalentSearch from "@/app/(components)/ui/findtalent/search";
import ArtistListItem from "@/app/(components)/ui/findtalent/artistListItem";
import { MockArtists } from "@/mockData/artistList";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function FindTalent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto 1fr"}}>
            <div
            style={{ gridColumn: "1 / span 2", gridRow: "2 / span 8"}}
            className="w-[270px] mx-[30px] relative">
                <Link href="/findtalent"><div className={clsx("z-8 absolute py-3 px-5 rounded-[20px_20px_0px_0px] text-xs bg-[#2a2054] w-[88px] tracking-[1px] h-[80px] shadow-[0px_0px_0px_#272525]", { "bg-[#332960] z-10": pathname === '/findtalent' },"hover:bg-[#3525de]")}>General</div></Link>
                <Link href="/findtalent/edm"><div className={clsx("z-8 absolute py-3 px-5 rounded-[20px_20px_0px_0px] ml-[88px] text-xs bg-[#2a2054] w-[70px] tracking-[1px] h-[80px] shadow-[0px_0px_0px_#272525]", { "bg-[#332960] z-10": pathname === '/findtalent/edm' },"hover:bg-[#3525de]")}>EDM</div></Link>
                <div className="z-20 absolute w-[100%]">{children}</div>
            </div>
            <div
            style={{ gridColumn: "3 / span 8", gridRow: "2 / span 8" }}
            className="h-[600px] mt-[10px] overflow-scroll">
            {MockArtists.map((artist) => (
                <ArtistListItem name={artist.name} photo={artist.profilePhoto} tags={artist.tags} key={artist.name} fanBase={artist.fanBase} numberOfEvents={artist.numberOfEvents}/>
            ))}
            </div>
        </div>
    )
  }