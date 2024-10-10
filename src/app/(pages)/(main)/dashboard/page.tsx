import SideNav from "@/app/(components)/ui/dashboard/sidenav";
import QuickStats from "@/app/(components)/ui/dashboard/quickstats";
import Notifications from "@/app/(components)/ui/dashboard/notifications";
import Messages from "@/app/(components)/ui/dashboard/messages";
import Nav from "@/app/(components)/ui/nav";
import UserInfo from "@/app/(components)/ui/dashboard/userinfo";
import Upcoming from "@/app/(components)/ui/dashboard/upcoming";
import "./layout.css";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto 1fr' }}>
    <>
      <div id="dashboard-top-content">
        <QuickStats />
        <UserInfo />
      </div>
      <div id="dashboard-bottom-content">
        <Notifications />
        <Messages />
        <Upcoming />
      </div>
    </>
    // </div>
  );
}
