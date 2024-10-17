"use client";

import { useState, useEffect, ChangeEvent } from "react";
import mockUsers from "@/mockData/user";
import Image from "next/image";
import Spotify from "/public/spotify-icon.png";
import TikTok from "/public/tiktok-icon.png";
import Instagram from "/public/ig-icon.png";
import Youtube from "/public/youtube-icon.png";
import NoImage from "/public/no-image.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import SelectGenre from "@/app/(components)/ui/dashboard/selectGenre";
import ImageUpload from "../../../(components)/ui/dashboard/ImageUpload"; // Import the ImageUpload component
import { useAuth, useUser } from "@clerk/nextjs"; // Clerk for ID

const animatedComponents = makeAnimated();

export default function EditProfile() {
  const { userId } = useAuth();
  const { user } = useUser();
  const [genres, setGenres] = useState<string[]>([]);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [artistName, setArtistName] = useState("");
  const [artistLocation, setArtistLocation] = useState("");
  const [artistBio, setArtistBio] = useState("");
  const [profilePicture, setprofilePicture] = useState<string>("");

  // get user profile on load
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();

        // get from DB
        setArtistName(userData.name);
        setArtistLocation(userData.location);
        setArtistBio(userData.profileDetails.aboutMe);
        setprofilePicture(userData.profileDetails.profilePicture);
        setGenres(userData.profileDetails.genre || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  // display either from DB, google profile image (clerk) or no-image in that order
  const getProfileImage = () => {
    if (profilePicture) {
      return profilePicture;
    } else if (user?.profilePicture) {
      return user.profilePicture;
    } else {
      return NoImage;
    }
  };

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  const handleLocationInput = (event: ChangeEvent<HTMLInputElement>) => {
    setArtistLocation(event.target.value);
  };

  const handleBioInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setArtistBio(event.target.value);
  };

  const handleImageChange = (newprofilePicture: string) => {
    setprofilePicture(newprofilePicture);
  };

  // updtae profile
  const handleSaveChanges = async () => {
    try {
      if (!userId) {
        alert("User not authenticated");
        return;
      }

      const profileData = {
        name: artistName,
        location: artistLocation,
        profileDetails: {
          aboutMe: artistBio,
          profilePicture: profilePicture,
          genre: genres,
        },
      };

      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setIsSent(true);
        // if saved to DB, refetch and display
        const updatedData = await response.json();
        setArtistName(updatedData.name);
        setArtistLocation(updatedData.location);
        setArtistBio(updatedData.profileDetails.aboutMe);
        setprofilePicture(updatedData.profileDetails.profilePicture);
        setGenres(updatedData.profileDetails.genre || []);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-[28%] p-3 justify-start">
        <div
          className="shadow-[0px_4px_5px_#191922] mx-[30px] my-0 py-[18px] px-2.5 rounded-[20px] text-center"
          style={{
            background: "linear-gradient(355deg, rgba(32,33,54,1) 0%, rgba(52,41,98,1) 100%)",
          }}
        >
          <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[10px]">
            Artist Name
          </span>
          <div className="m-3 tracking-[1px] text-sm text-[black]">
            <input
              type="text"
              className="text-center rounded-[20px] p-2 w-[80%]"
              value={artistName}
              onChange={handleNameInput}
            />
          </div>
          <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[50px] mb-[10px]">
            Location
          </span>
          <div className="m-3 tracking-[1px] text-sm text-[black]">
            <input
              type="text"
              className="text-center rounded-[20px] p-2 w-[80%]"
              value={artistLocation}
              onChange={handleLocationInput}
            />
          </div>
          <span className="block text-center text-[#ccff69] text-[11px] tracking-[1px] uppercase mt-[50px] mb-[10px]">
            Profile Photo
          </span>
          <div className="my-3 flex flex-col items-center justify-center rounded-[20px] p-3">
            <Image
              src={getProfileImage()}
              alt="Current Profile Photo"
              className="rounded-[20px]"
              width={110}
              height={110}
            />

            <ImageUpload setprofilePicture={handleImageChange} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[45%] p-3 justify-center overflow-y-scroll">
        <div className="shadow-[0px_4px_5px_#191922] my-0 py-[18px] px-2.5 rounded-[20px] text-center bg-[#2f2753]">
          <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[10px]">
            Artist Bio
          </span>
          <div className="m-3 tracking-[1px] text-sm text-[black]">
            <textarea
              className="text-center rounded-[20px] mt-1 p-3 w-[80%] h-[120px]"
              value={artistBio}
              onChange={handleBioInput}
            />
          </div>
        </div>
        <div className="shadow-[0px_4px_5px_#191922] mt-[40px] py-[18px] px-2.5 rounded-[20px] text-center bg-[#2f2753]">
          <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[10px]">
            Genres
          </span>
          <div className="m-4 px-10 tracking-[1px] text-sm text-[#ccff69]">
            <SelectGenre
              setGenres={setGenres}
              genres={genres}
              isSent={isSent}
              className="text-black"
            />
          </div>
        </div>
        <button className="mt-5 p-2 rounded bg-[#ccff69] text-[black]" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
      <div className="flex flex-col w-[10%] p-3 justify-start ml-[30px]">
        <div
          className="shadow-[0px_4px_5px_#191922] my-0 py-[18px] px-2.5 rounded-[20px] text-center"
          style={{
            background: "linear-gradient(355deg, rgba(32,33,54,1) 0%, rgba(52,41,98,1) 100%)",
          }}
        >
          <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[30px]">
            Social
          </span>
          <Image src={Spotify} alt="Spotify Icon" height={40} width={40} className="m-auto" />
          <Image src={TikTok} alt="TikTok Icon" height={43} width={43} className="m-auto mt-10" />
          <Image
            src={Instagram}
            alt="Instagram Icon"
            height={40}
            width={40}
            className="m-auto mt-10"
          />
          <Image
            src={Youtube}
            alt="YouTube Icon"
            height={40}
            width={40}
            className="m-auto mt-10 mb-3"
          />
        </div>
      </div>
    </div>
  );
}
