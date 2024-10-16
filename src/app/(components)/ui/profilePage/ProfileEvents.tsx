import { User } from "@/types/user";
import React from "react";
import EventsList from "../dashboard/EventsList";
//
interface Props {
  pageOwnerUser: User;
}
//
export default function ProfileEvents({ pageOwnerUser }: Props) {
  return (
    <div>
      <div
        className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
      >
        Our upcomingEvents
      </div>
      <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
      <div className="flex justify-center">
        <EventsList />
      </div>
    </div>
  );
}
