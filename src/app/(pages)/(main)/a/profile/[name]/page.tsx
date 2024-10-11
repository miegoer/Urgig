"use client";

import mockUsers from "@/mockData/user";
import Link from "next/link";
import Image from "next/image";
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
    {name: "Acoustic", color: "linear-gradient(355deg, rgba(111,216,133,1) 0%, rgba(145,235,0,1) 100%);"},
    { name: "Classical", color: "linear-gradient(355deg, rgba(222,181,0,1) 0%, rgba(160,100,46,1) 100%)" },
    {name: 'Country', color: 'linear-gradient(355deg, rgba(219,167,0,1) 0%, rgba(205,195,22,1) 100%);'},
    {name: 'Dance', color: "linear-gradient(355deg, rgba(255,122,240,1) 0%, rgba(103,253,243,1) 100%)"},
    { name: "Dark Ambient", color: "linear-gradient(355deg, rgba(0,18,112,1) 0%, rgba(126,2,70,1) 100%)" },
    {name: "Electronic",
    color: "linear-gradient(214deg, rgba(180,0,245,1) 0%, rgba(89,32,195,1) 100%)"},
    { name: "DJ", color: "linear-gradient(214deg, rgba(102,32,207,1) 0%, rgba(27,7,179,1) 100%" },
    {name: "Folk", color: "linear-gradient(355deg, rgba(219,111,0,1) 0%, rgba(71,112,0,1) 100%);"},
  { name: "Gregorian Chant", color: "linear-gradient(335deg, rgba(0,11,140,1) 0%, rgba(0,135,3,1) 100%)" }, {name: "Jazz", color: "linear-gradient(355deg, rgba(82,1,165,1) 0%, rgba(171,47,255,1) 100%);"},
  { name: "New Age", color: "linear-gradient(355deg, rgba(200,99,34,1) 0%, rgba(203,206,5,1) 100%);" },
  { name: "Orchestra", color: "linear-gradient(355deg, rgba(163,0,62,1) 0%, rgba(202,127,0,1) 100%)" },
  { name: "Pop", color: "linear-gradient(355deg, rgba(252,219,60,1) 0%, rgba(255,127,193,1) 100%)" },
  { name: "Symphony", color: "linear-gradient(355deg, rgba(149,0,152,1) 0%, rgba(150,16,0,1) 100%);" },
  {
    name: "Trance",
    color: "linear-gradient(214deg, rgba(22,189,217,1) 0%, rgba(5,136,199,1) 100%)",
  }, { name: "Trip Hop", color: "linear-gradient(355deg, rgba(165,1,74,1) 0%, rgba(255,47,88,1) 100%);" },
  {
    name: "Techno",
    color: "linear-gradient(214deg, rgba(22,217,179,1) 0%, rgba(5,199,148,1) 100%)",
  },
  { name: "EDM", color: "linear-gradient(214deg, rgba(6,106,175,1) 0%, rgba(61,135,118,1) 100%)" },
];

// TO DO: create function to find placement of icons depending on how many social accounts linked.

export default function ArtistProfile({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const pathname = usePathname();
    const decodedUrl = decodeURIComponent(pathname); 
    
    const artistName = decodedUrl.split('/').pop();
  
    const artist: ArtistItemProps | undefined = MockArtists.find((user) => user.name === artistName); // Pulls artist info based on the URL pathname
  
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
                {artist.tags.map((tag) => {
                    const tagData = genreTags.find((genreTag) => genreTag.name === tag);
                    const color = tagData ? tagData.color : 'linear-gradient(214deg, #23d5cd, #23d5cd)'; // Default color if not found
                    return (
                    <span className="inline-flex m-1.5 py-2 px-4 rounded-[15px]"
                    style={{ background: color }} key={tag}>
                        {tag}
                    </span>);
                    })}
                </div>
            </div>
        </>
    )
  }