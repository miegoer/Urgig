import Link from "next/link";
import Image from "next/image";
const Request = "/request-icon.png";
const Bookings = "/bookings-icon.png";
const Views = "/views-icon.png";
import "./dashboard-ui.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// Must be refactored later to work with data properties

export default function QuickStats({bookingsCount, views}: {bookingsCount: number; views:number}) {

  const router = useRouter();

  const userStats = [{ requests: 3 }, { bookings: bookingsCount }, { views: views }];

  const createStats = () => {
    return userStats.map((stat) => {
      let statId;
      let number;
      let type;
      let src: string;
      let route: string;

      if (stat.hasOwnProperty("requests")) {
        statId = "box-1";
        number = stat.requests;
        type = "Pending";
        src = Request;
        route = "/requests";
      } else if (stat.hasOwnProperty("bookings")) {
        statId = "box-2";
        number = stat.bookings;
        type = number !== 1 ? "Bookings" : "Booking";
        src = Bookings;
        route = "/bookings";
      } else if (stat.hasOwnProperty("views")) {
        statId = "box-3";
        number = stat.views;
        type = number !== 1 ? "Views" : "View";
        src = Views;
        route = "/views";
      }

      return (
        <div
          className="w-[130px] h-[130px] flex flex-col justify-center text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mt-[35px] mb-[15px] mx-[25px] m-5 rounded-[30%] hover:scale-105 transition-all duration-250"
          id={`${statId}`}
          key={statId}
          onClick={() => router.push(route)}
          style={{ cursor: "pointer" }}
        >
          <div className="flex items-center justify-center text-[28px]">
            <Image src={src} height={40} width={40} alt={`${type} icon`} className="mr-0.5" />
            {number}
          </div>
          <span className="text-[10px] uppercase tracking-[1px] mt-2.5">{type}</span>
        </div>
      );
    });
  };

  return (
    <div className="w-[630px] flex flex-row justify-center shadow-[0px_0px_0px_#272525] mx-[30px] my-0 pt-2.5 pb-[35px] px-2.5 rounded-[20px] bg-[#292346] overflow-x-auto">
      {createStats()}
    </div>
  );
}
