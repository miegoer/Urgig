import Image from "next/image";
const DJFrankenstein = "/mockUsers/DJFrankenstein.png";
const defaultPhoto = "/default-profile-photo.png";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { Ubuntu } from "next/font/google";
import {useEffect} from 'react';
import Link from "next/link";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

export default function UserInfo() {

  const { userId, userType } = useTalkSession();
  let receivedType: string;

  useEffect(() => {
    if (userId && userType) {
      receivedType = userType;
    }
  }, [userId, userType]);

  return (
    <div className="w-[460px] shadow-[0px_0px_0px_#272525] rounded-[20px] bg-[#292346] p-6 flex flex-row items-center justify-center overflow-x-auto">
      <Image
        src={defaultPhoto}
        height={80}
        width={80}
        alt="mock profile photo"
        className="h-[120px] w-[120px] object-cover rounded-[50%]"
      />
      <div className="flex flex-col justify-center ml-12">
        <div className={`text-xl text-[#ccff69] tracking-[2px] text-center mb-2.5 ${ubuntu.className}`}>
          DJ Frankenstein
        </div>
        <span className="block text-[13px] tracking-[2px] mb-2.5 text-center uppercase">
          {userType === 'promoter' && ('Promoter')}
          {userType === 'artist' && ('Artist')}
        </span>
        <div
          className={`flex flex-row tracking-[1px] ${ubuntu.className} border-t-[white] border-t border-solid mt-[6px] pt-[14px] justify-around`}
        >
          <Link href="/editprofile"><span className="block text-[12px] text-center text-[white] mt-[5px] rounded-[20px] bg-[#20202A] py-2 px-3">edit profile</span></Link>
        </div>
      </div>
    </div>
  );
}
