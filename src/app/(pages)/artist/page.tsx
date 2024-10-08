'use client'

import ArtistRegistration from "@/app/ui/artistRegistration";
import PromoterRegistration from "@/app/ui/promoterRegistration";
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