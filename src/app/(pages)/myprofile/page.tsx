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

const ubuntu = Ubuntu({
    weight: '400',
    subsets: ['latin'],
  })

const hoverInfo = [
    { name: 'Bio' }, { name: 'Fan Base' }, { name: 'Events' }, { name: 'Media' }, { name: 'Q&A' }
]

// Refactor to minimise repetitive code


// DESIGN 1

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
            <span className="block text-[11px] tracking-[1px] uppercase mr-0 mt-[1px] mb-[18px]">About</span>
             DJ Frankenstein is the best DJ you've never heard of. He was constructed with the remains of five legendary DJs across the world. All hail the Undead!
            </div>
            <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]">
                   
            </div>
        </>
    )
  }