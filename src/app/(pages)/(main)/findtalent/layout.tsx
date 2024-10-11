'use client'

import TalentSearch from "@/app/(components)/ui/findtalent/search";
import ArtistListItem from "@/app/(components)/ui/findtalent/artistListItem";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const mockArtists = [
    {name: 'Princess Cheeto', profilePhoto: "/mockUsers/princess-cheeto.webp", tags: ['Pop', 'Singer/Songwriter', 'Solo'], fanBase: {spotify: '100k', youtube: '40k', tiktok: '1m'}, numberOfEvents: 9},
    {name: 'DJ Pancakes', profilePhoto: '/mockUsers/DJPancakes.png', tags: ['EDM', 'Techno', 'Solo'], fanBase: {spotify: '9k', youtube: '11.1k', tiktok: '4.3k'}, numberOfEvents: 64},
    {name: 'The Man Bun Orchestra', profilePhoto: '/mockUsers/ManBunOrchestra.png', tags: ['Classical', 'Group'], fanBase: {spotify: '20.3k', youtube: '12.3k', tiktok: '19k'}, numberOfEvents: 145},
    {name: 'Bathtub Joe', profilePhoto: '/mockUsers/BathtubJoe.png', tags: ['Acoustic', 'Folk', 'Solo', 'Country'], fanBase: {spotify: '642', youtube: '195', tiktok: '23'},numberOfEvents: 11},
    {name: 'Britney Pears', profilePhoto: '/mockUsers/singer.png', tags: ['Pop', 'Solo'], fanBase: {spotify: '5.6k', youtube: '1k', tiktok: '3.2k'}, numberOfEvents: 78}
]

export default function FindTalent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: "auto 1fr"}}>
            {/* Sidebar */}
            <div
                style={{ gridColumn: "1 / span 2", gridRow: "2 / span 8" }}
                className="w-[270px] mx-[30px] relative"
            >
                <Link href="/findtalent">
                    <div
                        className={clsx(
                            "z-8 absolute py-3 px-5 rounded-[20px_20px_0px_0px] text-xs bg-[#2a2054] w-[88px] tracking-[1px] h-[80px] shadow-[0px_0px_0px_#272525]",
                            { "bg-[#332960] z-10": pathname === '/findtalent' },
                            "hover:bg-[#3525de]"
                        )}
                    >
                        General
                    </div>
                </Link>
                <Link href="/findtalent/edm">
                    <div
                        className={clsx(
                            "z-8 absolute py-3 px-5 rounded-[20px_20px_0px_0px] ml-[88px] text-xs bg-[#2a2054] w-[70px] tracking-[1px] h-[80px] shadow-[0px_0px_0px_#272525]",
                            { "bg-[#332960] z-10": pathname === '/findtalent/edm' },
                            "hover:bg-[#3525de]"
                        )}
                    >
                        EDM
                    </div>
                </Link>
                <div className="z-20 absolute w-full">{children}</div>
            </div>
            {/* Main Content with Custom Scrollbar */}
            <div
                style={{ gridColumn: "3 / span 8", gridRow: "2 / span 8" }}
                className={`h-[600px] mt-[10px] overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
            >
                {mockArtists.map((artist) => (
                    <ArtistListItem
                        key={artist.name}
                        name={artist.name}
                        photo={artist.profilePhoto}
                        tags={artist.tags}
                        fanBase={artist.fanBase}
                        numberOfEvents={artist.numberOfEvents}
                    />
                ))}
            </div>
        </div>
    )
}
