import TalentSearch from "@/app/(components)/ui/findtalent/search";
import ArtistListItem from "@/app/(components)/ui/findtalent/artistListItem";
import Image from "next/image";
import Link from "next/link";

const mockArtists = [
    {name: 'Princess Cheeto', profilePhoto: "/mockUsers/princess-cheeto.webp", bio: 'Meow', tags: ['Pop', 'Singer/Songwriter', 'Solo']},
    {name: 'DJ Pancakes', profilePhoto: '/mockUsers/DJPancakes.png', bio: 'You spin records, I spin pancakes', tags: ['EDM', 'Techno', 'Solo']},
    // {name: 'Jesus Christ', profilePhoto: '/mockUsers/princess-cheeto.webp', tags: ['Reggae', 'Ska', 'Solo']},
    {name: 'The Man Bun Orchestra', profilePhoto: '/mockUsers/ManBunOrchestra.png', bio: 'The ultimate bro squad', tags: ['Classical', 'Group']},
    {name: 'Bathtub Joe', profilePhoto: '/mockUsers/BathtubJoe.png', bio: 'The legend himself, with his bathtub', tags: ['Acoustic', 'Folk', 'Solo', 'Country']},
    {name: 'Fran', bio: 'I sing, duh', profilePhoto: '/mockUsers/singer.png', tags: ['Pop', 'Solo']}
]

export default function FindTalent() {
    return (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto 1fr"}}>
            <div
            style={{ gridColumn: "1 / span 2", gridRow: "2 / span 8"}}
            className="h-[620px] w-[270px] mx-[30px] relative">
                <div className="z-10 absolute py-3 px-5 rounded-[20px_20px_0px_0px] bg-[#342962] text-xs w-[88px] tracking-[1px] h-[80px] shadow-[0px_0px_0px_#272525]">General</div>
                <div className="z-8 absolute py-3 px-5 rounded-[20px_20px_0px_0px] bg-[#2a2054] ml-[88px] text-xs w-[70px] tracking-[1px] h-[80px]">EDM</div>
                <div className="z-20 absolute w-[100%]"><TalentSearch/></div>
            </div>
            <div
            style={{ gridColumn: "3 / span 8", gridRow: "2 / span 8" }}
            className="h-[600px] mt-[10px] overflow-scroll">
            {mockArtists.map((artist) => (
                <ArtistListItem name={artist.name} photo={artist.profilePhoto} tags={artist.tags}/>
            ))}
            </div>
        </div>
    )
  }