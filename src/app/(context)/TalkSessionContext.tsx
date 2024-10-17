"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Talk from "talkjs";
import { useUser } from "@clerk/nextjs";

interface TalkSessionContextProps {
  session: Talk.Session | null;
  userId: string | null;
  userType: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  setUserType: React.Dispatch<React.SetStateAction<string | null>>;
}

const TalkSessionContext = createContext<TalkSessionContextProps | undefined>(undefined);

export const useTalkSession = () => {
  const context = useContext(TalkSessionContext);
  if (!context) {
    throw new Error("useTalkSession must be used within a TalkSessionProvider");
  }
  return context;
};

export const TalkSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Talk.Session | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const getUser = async () => {
        try {
          const response = await fetch(`/api/users/${user.id}`);
          const userData = await response.json();
          console.log(userData);
          setUserData(userData);
          setUserType(userData.typeOfAccount);
          Talk.ready.then(() => {
            const mainUser = new Talk.User({
              id: user?.id ?? "",
              name: user?.firstName + " " + user?.lastName,
              email: user?.emailAddresses[0].emailAddress,
              photoUrl: `${
                userData.profileDetails.profilePicture ||
                `https://avatar.iran.liara.run/public/boy?username=${userData.name}`
              }`,
              welcomeMessage: "Hi!",
            });

            const talkSession = new Talk.Session({
              appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID!,
              me: mainUser,
            });

            setSession(talkSession);
          });
        } catch (error) {
          console.error(error);
        }
      };
      getUser();
      // setUserId("670830401234567890abcdef");
      setUserId(user.id);
    }
  }, [isLoaded]);

  useEffect(() => {}, []);

  return (
    <TalkSessionContext.Provider value={{ session, userId, userType, setUserType, setUserId }}>
      {children}
    </TalkSessionContext.Provider>
  );
};
