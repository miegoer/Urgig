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
    const router = useRouter();
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / span 3', gridRow: '2 / span 10' }} className="h-[660px] w-[530px] relative">
                <Image src={DJFrankenstein} alt="mock profile photo" className="h-[100%] w-[100%] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] -ml-5 rounded-r-[50%]"/>
                <div className="h-[80px] px-5 flex flex-col top-[82%] inline-flex z-5 absolute bg-[rgba(0,0,0,0.7)]">
                <div className={`z-10 py-2.5 rounded-[3px] tracking-[1.5px] text-[white] ${ubuntu.className} text-2xl`}>
                    {mockUsers[0].name}
                </div>
                <span className="text-sm italic -mt-2 text-center ${ubuntu.className}">{mockUsers[0].location}</span>
                </div>
                <Link href="#"><Image src={Back} 
                    alt="Back button" 
                    className="w-[40px] h-[40px] absolute top-[30px] left-[20px] hover:scale-[1.2] bg-[black] p-2 rounded-[20px]" 
                    onClick={(e) => {
                    e.preventDefault();
                    router.back();
                    }}/>
                </Link>
                <Image src={StartChat} alt="Chat button" className="w-[28px] h-[28px] absolute top-[40px] left-[78%] hover:scale-[1.2]"/>
                <Image src={Connect} alt="Connect button" className="w-[28px] h-[28px] absolute top-[120px] left-[90%] hover:scale-[1.2]"/>
                <Image src={Spotify} alt="Spotify button" className="w-[28px] h-[28px] absolute top-[220px] left-[96%] hover:scale-[1.2]"/>
                <Image src={Instagram} alt="Instagram button" className="w-[28px] h-[28px] absolute top-[330px] left-[98%] hover:scale-[1.2]"/>
                <Image src={Youtube} alt="YouTube button" className="w-[28px] h-[28px] absolute top-[440px] left-[95%] hover:scale-[1.2]"/>
                <Image src={Tiktok} alt="Tiktok button" className="w-[30px] h-[30px] absolute top-[545px] left-[85%] hover:scale-[1.2]"/>
            </div>
            <div style={{ gridColumn: '4 / span 4', gridRow: '1 / span 4' }} className="h-[660px] w-[450px]">
                <div className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}>
                    {/* {mockUsers[0].profileDetails.aboutMe} */}
                    DJ Frankenstein is the best DJ you've never heard of. He was created with the remains of five legendary DJs across the world. Hail the Undead!
                </div>
                <div className="ml-[70px] text-center border-t-[white] border-t w-[300px]">
                   
                </div>
            </div>
            <div style={{ gridColumn: '8 / span 3', gridRow: '2 / span 4' }} className="h-[660px] w-[180px] ml-3">
                <div className={`z-10 w-[100%] mt-1 p-4 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm border border-solid border-[white] mt-6`}>
                    <span className="border-b-[white] border-b border-solid">Fan Base</span>
                    <div className="mt-2">10k</div>
                </div>
            </div>
            <div style={{ gridColumn: '4 / span 4', gridRow: '7 / span 2' }} className="ml-3 mb-3">
                <div className={`z-10 w-[100%] p-2 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}>
                    <span className="mb-5">Test Link</span>
                </div>
            </div>
        </div>
    )
  }