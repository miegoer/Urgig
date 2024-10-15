import ProfileBio from "@/app/(components)/ui/profilePage/ProfileBio";
import { User } from "@/types/user";
import React from "react";

interface Props {
  user: User;
}
//
export default function ProfilePage({ user }: Props) {
  return (
    <>
      <ProfileBio user={user} />
    </>
  );
}
