"use client";
import QuickStats from "@/app/(components)/ui/dashboard/quickstats";
import Notifications from "@/app/(components)/ui/dashboard/notifications";
import NearbyInfo from "@/app/(components)/ui/dashboard/nearbyinfo";
import UserInfo from "@/app/(components)/ui/dashboard/userinfo";
import EventsList from "@/app/(components)/ui/dashboard/AllEventsList";
import { Button } from "@mui/material";
import { fillOutDB } from "../../../../../zz_dbbkp/fillOutDB";
import { PageOwnerUserProvider } from "@/app/(context)/PageOwnerUserContext";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getUser } from "@/app/utils/userUtils";
import { User } from "@/types/user";
import { EventsLoading, StatsLoading } from "@/app/(components)/ui/dashboard/loading/loading";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";

// import dynamic from 'next/dynamic';

export default function Page({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const { userType } = useTalkSession();

  const handleCount = (value: number) => {
    setBookingsCount(value); // Update the state
  };

  useEffect(() => {
    let currentId;
    if (userType === "artist") {
      currentId = "67082cc74e2febe010324134";
    } else {
      currentId = "670830401234567890abcdef";
    }
    const fetchUserInfo = async () => {
      try {
        const fetchedUser: User = await getUser(currentId as string);
        setUserInfo(fetchedUser);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchUserInfo();
  }, [userType]);

  const QuickStats = dynamic(() => import("@/app/(components)/ui/dashboard/quickstats"), {
    ssr: true,
    loading: () => <StatsLoading />,
  });

  const EventsList = dynamic(() => import("@/app/(components)/ui/dashboard/EventsList"), {
    ssr: true,
    loading: () => <EventsLoading />,
  });

  return (
    <>
      <div className="col-[col-start_2_/_span_10] row-[2_/_span_4] flex flex-row w-[110%] mb-[5px]">
        <QuickStats bookingsCount={bookingsCount} views={userInfo?.statistics?.profileViews} />
        <UserInfo userInfo={userInfo} isLoading={isLoading} />
      </div>
      <div className="col-[col-start_2_/_span_10] row-[6_/_span_4] h-[405px] flex flex-row w-[110%]">
        <Notifications />
        <EventsList handleCount={handleCount} />
        {/* {userInfo?.location ? (
          <NearbyInfo location={userInfo.location} isLoading={isLoading} />
            ) : (
          <p>Loading location...</p>)} */}
      </div>
      <Button onClick={fillOutDB}>DB OP's, DON'T CLINK!!!</Button>
    </>
  );
}
