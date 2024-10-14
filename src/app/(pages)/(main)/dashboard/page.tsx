"use client";
import SideNav from "@/app/(components)/ui/dashboard/sidenav";
import QuickStats from "@/app/(components)/ui/dashboard/quickstats";
import Notifications from "@/app/(components)/ui/dashboard/notifications";
import Messages from "@/app/(components)/ui/dashboard/messages";
import Nav from "@/app/(components)/ui/nav";
import UserInfo from "@/app/(components)/ui/dashboard/userinfo";
import EventsList from "@/app/(components)/ui/dashboard/EventsList";
import { Button } from "@mui/material";
import { fillOutDB } from "../../../../../zz_dbbkp/fillOutDB";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="col-[col-start_2_/_span_10] row-[2_/_span_4] flex flex-row w-[110%] mb-[5px]">
        <QuickStats />
        <UserInfo />
      </div>
      <div className="col-[col-start_2_/_span_10] row-[6_/_span_4] h-[405px] flex flex-row w-[110%]">
        <Notifications />
        <Messages />
        <EventsList />
      </div>
      <Button onClick={fillOutDB}>DB OP's, DON'T CLINK!!!</Button>
    </>
  );
}
