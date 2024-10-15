import React from "react";
import ProfileLayout from "@/app/(components)/ui/profilePage/layout";
//
//
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProfileLayout>
        <div>{children}</div>
      </ProfileLayout>
    </>
  );
}
