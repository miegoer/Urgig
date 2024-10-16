import ProfileEvents from "@/app/(components)/ui/profilePage/ProfileEvents";
import { User } from "@/types/user";
interface Props {
  user: User;
}

export default function Events({ user }: Props) {
  return <ProfileEvents user={user} />;
}
