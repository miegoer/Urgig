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

export default function SideNav() {
  return (
    <div className="col-[col-start_1_/_span_1] row-[2_/_span_8] w-[60px] shadow-[0px_0px_0px_#272525] ml-5 mt-0 pl-2.5 pr-0 pt-0 pb-[35px] rounded-[20px]">
      <Image src={Dashboard} alt="Dashboard Icon" width={35} height={35} className="py-6"/>
      <Image src={Earnings} alt="Earnings Icon" width={35} height={35} className="py-6"/>
      <Image src={Analytics} alt="Analytics Icon" width={35} height={35} className="py-6"/>
      <Image src={Contracts} alt="Contracts Icon" width={35} height={35} className="py-6"/>
      <Image src={Calendar} alt="Calendar Icon" width={35} height={35} className="py-6"/>
      <Image src={Profile} alt="Profile Icon" width={35} height={35} className="py-6"/>
      <Image src={Settings} alt="Settings Icon" width={35} height={35} className="py-6"/>
    </div>
  )
}

