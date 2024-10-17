"use client";
import React from "react";
import AllEventsList from "../dashboard/AllEventsList";
//
//
export default function ProfileEvents() {
  return (
    <div>
      <div
        className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
      >
        All Events
      </div>
      <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
      <div className="flex justify-center">
        <AllEventsList />
      </div>
    </div>
  );
}
