import ProfileFanbase from "@/app/(components)/ui/profilePage/Fanbase";
import { User } from "@/types/user";
import React from "react";

interface Props {
  user: User;
}
export default function FanBase({ user }: Props) {
  return <ProfileFanbase user={user} />;
}
