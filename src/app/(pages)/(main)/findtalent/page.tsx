import TalentSearch from "@/app/(components)/ui/findtalent/search";
import ArtistListItem from "@/app/(components)/ui/findtalent/artistListItem";
import Image from "next/image";
import Link from "next/link";

const mockArtists = [
    {name: 'Princess Cheeto', profilePhoto: "/mockUsers/princess-cheeto.webp", bio: 'Meow', tags: ['Pop', 'Singer/Songwriter', 'Solo']},
    {name: 'DJ Pancakes', profilePhoto: '/mockUsers/DJPancakes.png', bio: 'You spin records, I spin pancakes', tags: ['EDM', 'Techno', 'Solo']},
    {name: 'The Man Bun Orchestra', profilePhoto: '/mockUsers/ManBunOrchestra.png', bio: 'The ultimate bro squad', tags: ['Classical', 'Group']},
    {name: 'Bathtub Joe', profilePhoto: '/mockUsers/BathtubJoe.png', bio: 'The legend himself, with his bathtub', tags: ['Acoustic', 'Folk', 'Solo', 'Country']},
    {name: 'Fran', bio: 'I sing, duh', profilePhoto: '/mockUsers/singer.png', tags: ['Pop', 'Solo']}
]

export default function FindTalent() {
    return (
        <>
        <TalentSearch/>
        </>
    )
  }