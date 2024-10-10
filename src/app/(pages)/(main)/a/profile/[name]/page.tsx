"use client";

import mockUsers from "@/mockData/user";
import Link from "next/link";
const DJFrankenstein = "/mockUsers/DJFrankenstein.png";
import Image from "next/image";
const Back = "/back-icon.png";
const StartChat = "/startchat-icon.png";
const Connect = "/connect-icon.png";
const Spotify = "/spotify-icon.png";
const Instagram = "/ig-icon.png";
const Tiktok = "/tiktok-icon.png";
const Youtube = "/youtube-icon.png";
const Location = "/location-icon.png";
import { Ubuntu } from "next/font/google";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { MockArtists } from "@/mockData/artistList";
import { ArtistItemProps } from "@/mockData/artistList";
import "./page.css";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

interface userTag {
  name: string;
  color: string;
}

const genreTags: userTag[] = [
  {
    name: "Electronic",
    color: "linear-gradient(214deg, rgba(180,0,245,1) 0%, rgba(89,32,195,1) 100%)",
  },
  { name: "DJ", color: "linear-gradient(214deg, rgba(102,32,207,1) 0%, rgba(27,7,179,1) 100%)" },
  {
    name: "Trance",
    color: "linear-gradient(214deg, rgba(22,189,217,1) 0%, rgba(5,136,199,1) 100%)",
  },
  {
    name: "Techno",
    color: "linear-gradient(214deg, rgba(22,217,179,1) 0%, rgba(5,199,148,1) 100%)",
  },
  { name: "EDM", color: "linear-gradient(214deg, rgba(6,106,175,1) 0%, rgba(61,135,118,1) 100%)" },
];

// TO DO: refactor to minimise repetitive, change back button routing, create function to find placement of icons depending on how many social accounts linked.

export default function ArtistProfile({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const pathname = usePathname();
    const decodedUrl = decodeURIComponent(pathname);
    
    const artistName = decodedUrl.split('/').pop();
  
    const artist: ArtistItemProps | undefined = MockArtists.find((user) => user.name === artistName);
  
    if (!artist) {
      return <h1>Artist not found!</h1>;
    }
    return (
        <>
            <div className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}>
            {/* {mockUsers[0].profileDetails.aboutMe} */}
                <span className="inline-flex text-[11px] tracking-[1px] uppercase mr-0 mt-[1px] px-4 mb-[18px] rounded-[3px] text-[black] bg-[white]">About</span>
                <span className="block">
                {artist.profileDetails.aboutMe}
                </span>
            </div>
            <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
            <div className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}>
                <span className="inline-flex text-[11px] tracking-[1px] uppercase px-4 mr-0 mb-[18px] rounded-[3px] text-[black] bg-[white]">Details</span>
                <table className={`${ubuntu.className} m-auto`}><tbody>
                    <tr><td>Members</td><td>{artist.profileDetails.members}</td></tr>
                    <tr><td>Unplugged</td><td>No</td></tr>
                    <tr><td>Covers</td><td>Yes</td></tr>
                    <tr><td>Originals</td><td>Yes</td></tr>
                </tbody></table>
            </div>
            <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
            <div className={`z-10 w-[90%] mt-1 p-8 ml-6 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}>
            {/* {mockUsers[0].profileDetails.aboutMe} */}
                <span className="inline-flex text-[11px] tracking-[1px] uppercase mr-0 mt-[1px] px-4 mb-[16px] rounded-[3px] text-[black] bg-[white]">Genres</span>
                <div>
                {genreTags.map((tag) => (
                <span className="inline-flex bg-[#23d5cd] m-1.5 py-2 px-4 rounded-[15px]" style={{ background: tag.color }} key={tag.name}>{tag.name}</span>
            ))}
            </div>
            </div>
        </>
    )
  }