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
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const ubuntu = Ubuntu({
    weight: '400',
    subsets: ['latin'],
  })


const baseRoute = '/myprofile'

interface profileLink {
    name: string;
    href: string;
  }

const profileLinks: profileLink[] = [
    { name: 'Bio', href: `${baseRoute}`}, { name: 'Fan Base', href: `${baseRoute}/fanbase` }, { name: 'Events', href: `${baseRoute}/events` }, { name: 'Media', href: `${baseRoute}/media` }, { name: 'Q&A', href: `${baseRoute}/qa` }
]

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
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
                <Image src={StartChat} alt="Chat button" className="w-[28px] h-[28px] absolute top-[40px] left-[78%] hover:scale-[1.2]"/>
                <Image src={Connect} alt="Connect button" className="w-[28px] h-[28px] absolute top-[120px] left-[90%] hover:scale-[1.2]"/>
                <Image src={Spotify} alt="Spotify button" className="w-[28px] h-[28px] absolute top-[220px] left-[96%] hover:scale-[1.2]"/>
                <Image src={Instagram} alt="Instagram button" className="w-[28px] h-[28px] absolute top-[330px] left-[98%] hover:scale-[1.2]"/>
                <Image src={Youtube} alt="YouTube button" className="w-[28px] h-[28px] absolute top-[440px] left-[95%] hover:scale-[1.2]"/>
                <Image src={Tiktok} alt="Tiktok button" className="w-[30px] h-[30px] absolute top-[545px] left-[85%] hover:scale-[1.2]"/>
            </div>
            <div style={{ gridColumn: '4 / span 4', gridRow: '1 / span 4' }} className="h-[660px] w-[480px]">
            {children}
            </div>
            <div style={{ gridColumn: '8 / span 3', gridRow: '2 / span 8' }} className="w-[160px] ml-[70px]">
            {profileLinks.map((link) => (
                <Link href={link.href}>
                    <div className={clsx(
                        "w-[100%] my-[60px] p-4 rounded-[2px] text-center tracking-[3px] text-[white] text-xs border border-solid border-[white] uppercase",
                        { 'bg-[white] text-[#1b1b25]': pathname === link.href },
                        'hover:bg-[white] hover:text-[black] hover:scale-110'
                        )}>
                    {link.name}
                    </div>    
                </Link>          
            ))}
            </div>
        </div>
    )
  }