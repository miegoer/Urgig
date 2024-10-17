"use client";
import { usePageOwnerUser } from "@/app/(context)/PageOwnerUserContext";
import React from "react";
//
//
export default function ProfileFanbase() {
  const { pageOwnerUser } = usePageOwnerUser();

  if (!pageOwnerUser) {
    return <div>Loading...</div>;
  }

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
