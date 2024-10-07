"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

interface MainNavLink {
    name: string;
    href: string;
}
const links: MainNavLink[] = [
    { name: 'Dashboard', href: '/a/dashboard' },
    { name: 'Find Gigs', href: '/a/dashboard/events' },
    { name: 'Profile', href: '/a/dashboard/profileSetting' },
    { name: 'Messages', href: '/a/dashboard/messages' },
];

export default function navBarA () {
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