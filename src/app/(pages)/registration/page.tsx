'use client'

import ArtistRegistration from "@/app/(pages)/registration/artistRegistration";
import PromoterRegistration from "@/app/(pages)/registration/promoterRegistration";
import { useState, useEffect } from "react";

export default function Artist({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState("Artist");
  useEffect(() => {
    setUserType("Artist");
  }, [])

  return (
  <>
  {userType === "Artist" && (
    <ArtistRegistration/>
  )}
  {userType === "Promoter" && (
    <PromoterRegistration/>
  )}
  {userType !== "Artist" && userType !== "Promoter" && (
      <div>Error: User type not found</div>
    )}
  </>
  );
}