"use client";

import { useEffect, useState } from 'react';
import { auth, db } from '@/app/api/(3rdParty)/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import mockUsers from "@/mockData/user";
import Link from "next/link";
const DJFrankenstein = "/mockUsers/DJFrankenstein.png";
import Image from "next/image";
const Back = "/back-icon.png";
const StartChat = "/startchat-icon.png";
const Connect = "/connect-icon.png";
const Spotify = "/spotify-icon.png";
const Instagram = "/ig-icon.png";
const Tiktok = "/tiktok-icon.png";
const Youtube = "/youtube-icon.png";
const Location = "/location-icon.png";
import { Ubuntu } from "next/font/google";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import imageURL from "../../../(components)/ui/dashboard/ImageUpload"

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [profileImageURL, setProfileImageURL] = useState('/mockUsers/DJFrankenstein.png');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.profileImageURL) {
              setProfileImageURL(data.profileImageURL);
            }
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      } else {
        console.error('No user is signed in');
      }
    };

    fetchUserData();
  }, []);


  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <div
        style={{ gridColumn: "1 / span 3", gridRow: "2 / span 10" }}
        className="h-[630px] w-[500px] relative"
      >
        <Image
          src={profileImageURL}
          width={660}
          height={530}
          alt="Profile Photo"
          className="h-[100%] w-[100%] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] -ml-5 rounded-r-[50%]"
        />
        <div className="h-[80px] px-5 flex flex-col top-[82%] inline-flex z-5 absolute bg-[rgba(0,0,0,0.7)]">
          <div
            className={`z-10 py-2.5 rounded-[3px] tracking-[1.5px] text-[white] ${ubuntu.className} text-2xl`}
          >
            {mockUsers[0].name}
          </div>
          <span className="text-sm italic -mt-2 text-center ${ubuntu.className}">
            {mockUsers[0].location}
          </span>
        </div>
        <Image
          src={StartChat}
          width={28}
          height={28}
          alt="Chat button"
          className="w-[28px] h-[28px] absolute top-[40px] left-[78%] hover:scale-[1.2] transition-all duration-200"
        />
        <Image
          src={Connect}
          width={28}
          height={28}
          alt="Connect button"
          className="w-[28px] h-[28px] absolute top-[120px] left-[90%] hover:scale-[1.2] transition-all duration-200"
        />
        <Image
          src={Spotify}
          width={28}
          height={28}
          alt="Spotify button"
          className="w-[28px] h-[28px] absolute top-[220px] left-[96%] hover:scale-[1.2] transition-all duration-200"
        />
        <Image
          src={Instagram}
          width={28}
          height={28}
          alt="Instagram button"
          className="w-[28px] h-[28px] absolute top-[330px] left-[98%] hover:scale-[1.2] transition-all duration-200"
        />
        <Image
          src={Youtube}
          width={28}
          height={28}
          alt="YouTube button"
          className="w-[28px] h-[28px] absolute top-[440px] left-[95%] hover:scale-[1.2] transition-all duration-200"
        />
        <Image
          src={Tiktok}
          width={28}
          height={28}
          alt="Tiktok button"
          className="w-[30px] h-[30px] absolute top-[545px] left-[82%] hover:scale-[1.2] transition-all duration-200"
        />
      </div>
      <div
        style={{ gridColumn: "4 / span 4", gridRow: "1 / span 4" }}
        className="h-[660px] w-[480px]"
      >
        {children}
      </div>
      <div
        style={{ gridColumn: "8 / span 3", gridRow: "2 / span 8" }}
        className="z-10 w-[160px] ml-[70px]"
      >
        <Link href="/booknow">
        <div className=
            "w-[100%] bg-[#20202A] my-[60px] p-4 rounded-[2px] text-center tracking-[3px] text-[#ccff69] text-xs border-2 border-solid border-[#ccff69] uppercase transition-all duration-200 pulse-button">
              Book Now
            </div>
        </Link>
        {profileLinks.map((link) => (
          <Link href={link.href}>
            <div
              className={clsx(
                "z-15 w-[100%] my-[60px] p-4 rounded-[2px] text-center tracking-[3px] text-xs border border-solid border-[white] uppercase transition-all duration-200",
                { "z-100 bg-[white] text-[#20202d]": pathname === link.href },
                "hover:bg-[white] hover:text-[black] hover:scale-110"
              )}
            >
              {link.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
