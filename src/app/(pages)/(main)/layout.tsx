'use client';

import Nav from "@/app/(components)/ui/nav";
import React from "react";
import { useState, useCallback } from "react";
import Talk from 'talkjs'
import TalkInboxPopup from "@/app/(components)/ui/messagePopUp";

export default function Layout({ children }: { children: React.ReactNode }) {

  const [isPopupVisible, setPopupVisible] = useState(false);

  // The syncUser callback creates the user object
  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: "nina",
        name: "Nina",
        email: "nina@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
        welcomeMessage: "Hi!",
        role: "user"
      }),
    []
  );

  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  return (
    <>
      <Nav />
      <img style={{ cursor: "pointer", width: "80px", height: "auto", zIndex: "9999", bottom: "20px", right: "20px", position: "absolute" }} 
      src="./messages-icon.png" 
      onClick={togglePopup} 
      onMouseOver={(e: React.MouseEvent<HTMLImageElement>) => {
        e.currentTarget.style.transform = 'scale(1.2)';
      }}
      onMouseOut={(e: React.MouseEvent<HTMLImageElement>) => {
        e.currentTarget.style.transform = 'scale(1.0)';
      }}
      ></img>
      {isPopupVisible && <TalkInboxPopup user={syncUser()} />}
      {children}
    </>
  );
}
