import ProfileMedia from "@/app/(components)/ui/profilePage/ProfileMedia";
import { User } from "@/types/user";
import React from "react";

interface Props {
  user: User;
}
export default function FanBase({ user }: Props) {
  return <ProfileMedia user={user} />;
}
