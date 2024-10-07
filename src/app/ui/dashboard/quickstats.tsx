import Link from 'next/link';
import Image from "next/image";
import Request from '@/public/request-icon.png';
import Bookings from '@/public/bookings-icon.png';
import Views from '@/public/views-icon.png';
import './dashboard-ui.css';

export default function QuickStats() {
  return (
    // <div className="w-[112%] h-[35%] flex flex-row justify-center shadow-[0px_0px_0px_#272525] mx-[30px] my-0 rounded-[20px] bg-[#252531]">
    <div id="quick-stats-container">
        <div className="stat-box" id="box-1">
            <span className="dashboard-count">
              <Image src={Request} height={40} width={40} alt="Requests Icon" className="mr-0.5"/> 3</span>
        <span className="dashboard-detail-text">Requests</span>
          </div>
          <div className="stat-box" id="box-2">
            <span className="dashboard-count">
              <Image src={Bookings} height={40} width={40} alt="Bookings Icon" className="mr-0.5"/> 2</span>
            <span className="dashboard-detail-text">Bookings</span>
          </div>
          <div className="stat-box" id="box-3">
            <span className="dashboard-count">
              <Image src={Views} height={40} width={40} alt="Views Icon" className="mr-0.5"/> 15</span>
        <span className="dashboard-detail-text">Profile Views</span></div>
    </div>
  )
}