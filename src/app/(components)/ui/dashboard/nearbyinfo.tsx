import "./dashboard-ui.css";
import Image from "next/image";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { useEffect } from "react";
import mockUsers from "@/mockData/user";
const defaultPhoto = "/default-profile-photo.png";

const mockGigList = [
  { name: 'Gig 1', location: 'London, UK'},
  { name: 'Gig 2', location: 'London, UK' }
]

export default function NearbyInfo({location, isLoading} : {location:string | undefined, isLoading:boolean}) {

  const { userId, userType } = useTalkSession();
  let receivedType: string;

  useEffect(() => {
    if (userId && userType) {
      receivedType = userType;
    }
  }, [userId, userType]);

  return (
    <div className="w-[300px] shadow-[0px_0px_0px_#272525] ml-[30px] mt-5 mb-0 p-5 rounded-[20px] bg-[#292346] overflow-x-auto overflow-auto">
      <div className="w-[98%]">
        <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[3px] mb-[18px]">
          {userType === 'promoter' && ('Nearby Artists')}
          {userType === 'artist' && ('Nearby Gigs')}
        </span>
        {!location ? (
          <p>Loading...</p> // Show loading when location is falsy
          ) : (
          <>
          {userType === 'promoter' && (
            mockUsers.map((artist) => (
              <div
                className={`h-[70px] text-white text-[11px] flex flex-row mx-0 my-3 px-[30px] py-3 rounded-[15px] message-box-read`}
                key={artist.name}>
                <Image
                  src={`${artist.profileDetails.profilePhoto ? artist.profileDetails.profilePhoto : defaultPhoto}`}
                  className="object-cover ml-[-15px] mr-5 rounded-[50%]"
                  alt={artist.name}
                  width={45}
                  height={45}
                />
                <div className="flex flex-col w-[90%]">
                  <span className="text-[13px] mb-[5px]">{artist.name}</span>
                  <span className="tracking-[1px]">{artist.profileDetails.genre}</span>
                </div>
              </div>
            ))
          )}
          {userType === 'artist' && (
            mockGigList.map((gig) => (
              <div key={gig.name}>{gig.name}</div>
            ))
          )}
          </>
        )}
      </div>
    </div>
  );
}
