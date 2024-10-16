import { User } from "@/types/user";
import React from "react";
//
interface Props {
  pageOwnerUser: User;
}
//
export default function ProfileFanbase({ pageOwnerUser }: Props) {
  return (
    <div>
      <div
        className={`z-10 w-[100%] mt-1 p-8 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
      >
        FanBase Info
      </div>
      <div className="ml-[90px] text-center border-t-[white] border-t w-[300px]"></div>
    </div>
  );
}
