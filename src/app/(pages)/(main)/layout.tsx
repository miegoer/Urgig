'use client';

import Nav from "@/app/(components)/ui/nav";
import React from "react";
import { useState, useCallback } from "react";
import Talk from 'talkjs'
import TalkInboxPopup from "@/app/(components)/ui/messagePopUp";
import { TalkSessionProvider } from "@/app/(context)/TalkSessionContext";

export default function Layout({ children }: { children: React.ReactNode }) {

  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  return (
    <>
      <TalkSessionProvider>
      <Nav />
      <img style={{ cursor: "pointer", width: "80px", height: "auto", zIndex: "9999", bottom: "20px", right: "20px", position: "fixed" }} 
      src="./messages-icon.png" 
      onClick={togglePopup} 
      onMouseOver={(e: React.MouseEvent<HTMLImageElement>) => {
        e.currentTarget.style.transform = 'scale(1.2)';
      }}
      onMouseOut={(e: React.MouseEvent<HTMLImageElement>) => {
        e.currentTarget.style.transform = 'scale(1.0)';
      }}
      ></img>
      {isPopupVisible && <TalkInboxPopup />}
      {children}
      </TalkSessionProvider>
    </>
  );
}
