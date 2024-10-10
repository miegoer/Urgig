'use client'

import mockUsers from '@/mockData/user';
import Link from 'next/link';
import DJFrankenstein from '@/public/mockUsers/DJFrankenstein.png'
import Image from "next/image";
import Back from '@/public/back-icon.png';
import StartChat from '@/public/startchat-icon.png';
import Connect from '@/public/connect-icon.png';
import Spotify from '@/public/spotify-icon.png';
import Instagram from '@/public/ig-icon.png';
import Tiktok from '@/public/tiktok-icon.png';
import Youtube from '@/public/youtube-icon.png';
import Location from '@/public/location-icon.png';
import {Ubuntu} from 'next/font/google';
import { useRouter } from 'next/navigation';
import './page.css'

const ubuntu = Ubuntu({
    weight: '400',
    subsets: ['latin'],
  })

interface userTag {
    name: string;
    color: string;
  }

const genreTags:userTag[] = [
    {name: 'Electronic', color: 'linear-gradient(214deg, rgba(180,0,245,1) 0%, rgba(89,32,195,1) 100%)'},
    {name: 'DJ', color: 'linear-gradient(214deg, rgba(102,32,207,1) 0%, rgba(27,7,179,1) 100%)'},
    {name: 'Trance', color: 'linear-gradient(214deg, rgba(22,189,217,1) 0%, rgba(5,136,199,1) 100%)'},
    {name: 'Techno', color: 'linear-gradient(214deg, rgba(22,217,179,1) 0%, rgba(5,199,148,1) 100%)'},
    {name: 'EDM', color: 'linear-gradient(214deg, rgba(6,106,175,1) 0%, rgba(61,135,118,1) 100%)'}
]

// TO DO: refactor to minimise repetitive, change back button routing, create function to find placement of icons depending on how many social accounts linked.


// DESIGN 1 (Keep Here Until Final Design is Chosen)

// export default function MyProfile() {
//     const router = useRouter();
//     return (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto 1fr' }}>
//             <div style={{ gridColumn: '1 / span 3', gridRow: '2 / span 10' }} className="h-[660px] w-[550px] relative">
//                 <Image src={DJFrankenstein} alt="mock profile photo" className="h-[100%] w-[100%] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]"/>
//                 <div className="w-[70px] h-[660px] flex flex-col top-[0%] left-[0%] z-10 absolute bg-[rgba(0,0,0,0.3)]">
//                 <Link href="#"><Image src={Back} 
//                     alt="Back button" 
//                     className="w-[25px] h-[25px] absolute top-[30px] left-[20px] hover:scale-[1.2]" 
//                     onClick={(e) => {
//                     e.preventDefault();
//                     router.back();
//                     }}/>
//                 </Link>
//                 <Image src={StartChat} alt="Chat button" className="w-[28px] h-[28px] absolute top-[150px] left-[20px] hover:scale-[1.2]"/>
//                 <Image src={Connect} alt="Connect button" className="w-[28px] h-[28px] absolute top-[260px] left-[20px] hover:scale-[1.2]"/>
//                 <Image src={Spotify} alt="Spotify button" className="w-[28px] h-[28px] absolute top-[370px] left-[20px] hover:scale-[1.2]"/>
//                 <Image src={Instagram} alt="Instagram button" className="w-[28px] h-[28px] absolute top-[480px] left-[20px] hover:scale-[1.2]"/>
//                 <Image src={Youtube} alt="YouTube button" className="w-[28px] h-[28px] absolute top-[590px] left-[20px] hover:scale-[1.2]"/>
//                 </div>
//             </div>
//             <div style={{ gridColumn: '4 / span 5', gridRow: '2 / span 1' }} className="h-[660px] w-[550px]">
//                 <div className={`z-10 top-[80%] p-4 rounded-[2px] text-center tracking-[1px] bg-[white] text-[black] ${ubuntu.className} text-2xl`}>
//                     {mockUsers[0].name}
//                 </div>
//                 <div className={`z-10 top-[80%] left-[30%] w-[100%] p-8 rounded-[2px] text-center bg-[black] opacity-80 tracking-[1px] ${ubuntu.className} text-[white] text-sm`}>
//                     {mockUsers[0].profileDetails.aboutMe}
//                 </div>
//             </div>
//         </div>
//     )
//   }

export default function MyProfile() {
    return (
        <>
            <div className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}>
            {/* {mockUsers[0].profileDetails.aboutMe} */}
                <span className="inline-flex text-[11px] tracking-[1px] uppercase mr-0 mt-[1px] px-4 mb-[18px] rounded-[3px] text-[black] bg-[white]">About</span>
                <span className="block">
                DJ Frankenstein is the best DJ you've never heard of. He was constructed with the remains of five legendary DJs across the world, who all perished under mysterious circumstances. All hail the Undead!
                </span>
            </div>
            <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
            <div className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}>
                <span className="inline-flex text-[11px] tracking-[1px] uppercase px-4 mr-0 mb-[18px] rounded-[3px] text-[black] bg-[white]">Details</span>
                <table className={`${ubuntu.className} m-auto`}><tbody>
                    <tr><td>Members</td><td>1</td></tr>
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
                <span className="inline-flex bg-[#23d5cd] m-1.5 py-2 px-4 rounded-[15px]" style={{ background: tag.color }}>{tag.name}</span>
            ))}
            </div>
            </div>
        </>
    )
  }