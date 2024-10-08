'use client'

import Link from 'next/link';
import Image from "next/image";
import Earnings from '@/public/earnings-icon.png';
import Analytics from '@/public/analytics-icon.png';
import Settings from '@/public/settings-icon.png';
import Calendar from '@/public/calendar-icon.png';
import Profile from '@/public/profile-icon.png';
import Contracts from '@/public/contracts-icon.png';
import Dashboard from '@/public/dashboard-icon.png';
import './dashboard-ui.css';

const sideNavLinks = [
  { icon: Dashboard, alt: 'Dashboard Icon' },
  { icon: Earnings, alt: 'Earnings Icon' },
  { icon: Analytics, alt: 'Analytics Icon' },
  { icon: Contracts, alt: 'Contracts Icon' },
  { icon: Calendar, alt: 'Calendar Icon' },
  { icon: Profile, alt: 'Profile Icon' },
  { icon: Settings, alt: 'Settings Icon' }
] // Icons in the Dashboard's SideNav. Not yet linked to pages.

export default function SideNav() {
  return (
    <div className="col-[col-start_1_/_span_1] row-[2_/_span_8] w-[65px] shadow-[0px_0px_0px_#272525] ml-5 mt-0 pl-2.5 pr-0 pt-0 pb-[35px] rounded-[20px]">
      {sideNavLinks.map((link) => (
        <Image src={link.icon} alt={link.alt} width={35} height={35} className="my-[42px] p-[5px] hover:bg-[#3525de] hover:rounded-[10px] hover:h-[35px]"/> 
      ))}
    </div>
  )
}
