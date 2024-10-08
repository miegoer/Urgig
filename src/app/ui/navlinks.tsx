"use client"

import Link from 'next/link';
import clsx from 'clsx';
import Notifications from '@/public/notifications-bell.png';
import Messages from '@/public/messages-icon.png';
import Image from "next/image";
import { usePathname } from 'next/navigation';

interface MainNavLink {
    name: string;
    href: string;
}

// const links: MainNavLink[] = [
//     { name: 'Dashboard', href: '/p/dashboard' },
//     { name: 'Find Talent', href: '/p/dashboard/artists' },
//     { name: 'Find Gigs', href: '/p/dashboard/events' },
//     { name: 'Profile', href: '/p/dashboard/profileSetting' },
//     { name: 'Messages', href: '/p/dashboard/messages' }
// ];

const links: MainNavLink[] = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Find Talent', href: '/findtalent' },
    { name: 'Find Gigs', href: '/findgigs' },
    { name: 'Profile', href: '/myprofile' },
]; // Links in the global Main Nav at the top of the page

export default function NavLinks () {
    const pathname = usePathname();
    return (
        <>
        {links.map((link: MainNavLink) => (
            <Link key={link.name} href={link.href} className={clsx(
                'text-[#dcff58] p-3 uppercase text-[12px] mx-[25px] my-[6px] tracking-[3px] transition-all duration-200',
                {'text-[#ffc037]': pathname === link.href},
                'hover:bg-[#3525de] hover:rounded-[5px]')}>
                {link.name}
            </Link>
        ))}
        <Image src={Notifications} alt="notifications bell" height={20} width={20} className="ml-8 mr-1"/>
        <Image src={Messages} alt="notifications bell" height={20} width={20} className="ml-5 mr-5"/>
        </>
    )
}