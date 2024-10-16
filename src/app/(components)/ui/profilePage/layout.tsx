"use client";

import FirstCol from "@/app/(components)/ui/profilePage/FirstCol";
import ThirdCol from "@/app/(components)/ui/profilePage/ThirdCol";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { getUser } from "@/app/utils/userUtils";
import { User } from "@/types/user";
import { Ubuntu } from "next/font/google";
import React, { useEffect, useState } from "react";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useTalkSession();

  useEffect(() => {
    (async () => {
      //this is iife
      if (!userId) return;
      setUser(await getUser(userId));
    })();
  }, [userId]); // Dependency array uses userId to load only after context is loaded (and userId doesn't change so it's just once)

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { user });
    }
    return child;
  });

  return (
    <div className="flex flex-row">
    <div
      id="mainGrid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <>
        <div
          id="1stcol"
          style={{ gridColumn: "1 / span 3", gridRow: "2 / span 10" }}
          className="h-[630px] w-[500px] relative"
        >
          <FirstCol sessionUser={user!} />
        </div>
        <div
          id="2ndcol"
          style={{ gridColumn: "4 / span 4", gridRow: "1 / span 4" }}
          className="h-[660px] w-[480px]"
        >
          {childrenWithProps}
        </div>
        <div
          id="3rdcol"
          style={{ gridColumn: "8 / span 3", gridRow: "2 / span 8" }}
          className="z-10 w-[160px] ml-[70px]"
        >
          <ThirdCol sessionUser={user!} />
        </div>
      </>
    </div>
    </div>
  );
}
