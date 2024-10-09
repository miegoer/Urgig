import Link from 'next/link';
import Image from "next/image";
import Request from '@/public/request-icon.png';
import Bookings from '@/public/bookings-icon.png';
import Views from '@/public/views-icon.png';
import './dashboard-ui.css';

// Must be refactored later -- map through stats to minimize repetitive code

export default function QuickStats() {
  return (
    <div className="w-[58%] flex flex-row justify-center shadow-[0px_0px_0px_#272525] mx-[30px] my-0 pt-2.5 pb-[35px] px-2.5 rounded-[20px] bg-[#252531]">
        <div className="w-[130px] h-[130px] flex flex-col justify-center text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mt-[35px] mb-[15px] mx-[25px] m-5 rounded-[30%]" id="box-1">
            <div className="flex items-center justify-center text-[28px]">
              <Image src={Request} height={40} width={40} alt="Requests Icon" className="mr-0.5"/> 3</div>
        <span className="text-[10px] uppercase tracking-[1px] mt-2.5">Requests</span>
          </div>
          <div className="w-[130px] h-[130px] flex flex-col justify-center text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mt-[35px] mb-[15px] mx-[25px] m-5 rounded-[30%]" id="box-2">
            <div className="flex items-center justify-center text-[28px]">
              <Image src={Bookings} height={40} width={40} alt="Bookings Icon" className="mr-0.5"/> 2</div>
            <span className="text-[10px] uppercase tracking-[1px] mt-2.5">Bookings</span>
          </div>
          <div className="w-[130px] h-[130px] flex flex-col justify-center text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mt-[35px] mb-[15px] mx-[25px] m-5 rounded-[30%]" id="box-3">
            <div className="flex items-center justify-center text-[28px]">
              <Image src={Views} height={40} width={40} alt="Views Icon" className="mr-0.5"/> 15</div>
        <span className="text-[10px] uppercase tracking-[1px] mt-2.5">Profile Views</span></div>
    </div>
  )
}