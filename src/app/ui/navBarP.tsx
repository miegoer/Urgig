"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

interface MainNavLink {
    name: string;
    href: string;
}
const links: MainNavLink[] = [
    { name: 'Dashboard', href: '/p/dashboard' },
    { name: 'Find Talent', href: '/p/dashboard/artists' },
    { name: 'Find Gigs', href: '/p/dashboard/events' },
    { name: 'Profile', href: '/p/dashboard/profileSetting' },
    { name: 'Messages', href: '/p/dashboard/messages' }
];

export default function NavBarP () {
    const pathname = usePathname();
    return (
        <>
        {links.map((link: MainNavLink) => (
            <Link key={link.name} href={link.href} className={clsx(
                'text-[#dcff58] uppercase text-[12px] mx-[30px] my-[10px] tracking-[3px]',{'text-[#ffc037]': pathname === link.href})}>
                {link.name}
            </Link>
        ))}
        </>
    )
}