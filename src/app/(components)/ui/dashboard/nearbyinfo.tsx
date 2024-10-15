import "./dashboard-ui.css";
import Image from "next/image";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { useEffect } from "react";
import mockUsers from "@/mockData/user";

const mockGigList = [
  { name: 'Gig 1', location: 'London, UK'},
  { name: 'Gig 2', location: 'London, UK' }
]

export default function NearbyInfo() {

  const { userId, userType } = useTalkSession();
  let receivedType: string;

  useEffect(() => {
    if (userId && userType) {
      receivedType = userType;
    }
  }, [userId, userType]);

  return (
    <div className="w-[360px] shadow-[0px_0px_0px_#272525] mr-[30px] mt-5 mb-0 p-5 rounded-[20px] bg-[#252531] overflow-x-auto overflow-auto">
      <div className="w-[98%]">
        <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[3px] mb-[18px]">
          {userType === 'promoter' && ('Nearby Artists')}
          {userType === 'artist' && ('Nearby Gigs')}
        </span>
        {userType === 'promoter' && (
          mockUsers.map((artist) => (
            <div>{artist.name}</div>
          ))
        )}
        {userType === 'artist' && (
          mockGigList.map((gig) => (
            <div>{gig.name}</div>
          ))
        )}
      </div>
    </div>
  );
}
