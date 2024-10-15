'use client'

import mockUsers from "@/mockData/user"
import { useState, ChangeEvent } from 'react';
import Image from "next/image";
import Spotify from "/public/spotify-icon.png";
import TikTok from "/public/tiktok-icon.png";
const Instagram = "/ig-icon.png";
const Youtube = "/youtube-icon.png";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import SelectGenre from "@/app/(components)/ui/dashboard/selectGenre";
import ImageUpload from '../../../(components)/ui/dashboard/ImageUpload'; // Import the ImageUpload component

const animatedComponents = makeAnimated();

const options = [
  { value: 'option1', label: 'Dark Ambient' },
  { value: 'option2', label: 'EDM' },
  { value: 'option3', label: 'Electronic' },
  { value: 'option4', label: 'Folk' },
  { value: 'option5', label: 'Hip-Hop' },
  { value: 'option6', label: 'House' },
  { value: 'option7', label: 'Jazz' },
  { value: 'option8', label: 'Trip-Hop' }
  // Mock data for now because genre list format will have to change
];

export default function EditProfile() {
  const [genres, setGenres] = useState<string[]>([]);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [artistName, setArtistName] = useState(mockUsers[0].name);
  const [artistLocation, setArtistLocation] = useState(mockUsers[0].location);
  const [artistBio, setArtistBio] = useState(mockUsers[0].profileDetails.aboutMe);
  const [imageURL, setImageURL] = useState<string>('/mockUsers/DJFrankenstein.png'); // Initialize imageURL state

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  const handleLocationInput = (event: ChangeEvent<HTMLInputElement>) => {
    setArtistLocation(event.target.value);
  };

  const handleBioInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setArtistBio(event.target.value);
  };

  return (
    <div className="flex flex-row">
        <div className="flex flex-col w-[22%] p-3 justify-start">
            <div className="shadow-[0px_4px_5px_#191922] mx-[15px] my-0 py-[18px] px-2.5 rounded-[20px] text-center" style= {{background: "linear-gradient(355deg, rgba(32,33,54,1) 0%, rgba(52,41,98,1) 100%)"}} >
                <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[10px]">
                    Artist Name
                </span>
                <div className="m-3 tracking-[1px] text-sm text-[black]">
                    <input type="text" className="text-center rounded-[20px] p-2 w-[90%]" value={artistName} onChange={(event) => handleNameInput(event)}/>
                </div>
                <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[50px] mb-[10px]">
                    Location
                </span>
                <div className="m-3 tracking-[1px] text-sm text-[black]">
                    <input type="text" className="text-center rounded-[20px] p-2 w-[90%]" value={artistLocation} onChange={(event) => handleLocationInput(event)}/>
                </div>
                <span className="block text-center text-[#ccff69] text-[11px] tracking-[1px] uppercase mt-[50px] mb-[10px]">
                    Profile Photo
                </span>
                <div className="my-3 flex flex-row justify-center rounded-[20px] hover:bg-[#1a1725] transition-all duration-200 cursor-pointer p-3">
                    <Image src='/mockUsers/DJFrankenstein.png' alt="Current Profile Photo" className="rounded-[20px]" width={110} height={110}/>
                    <div className="flex flex-col items-center justify-center w-[110px] h-[110px] tracking-[1px] text-xs ml-3">
                        <Image src='/upload-icon.png' alt="Upload Photo Icon" width={25} height={25}/>
                        <span className="text-center mt-3">Upload New Profile Photo</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col w-[45%] p-3 justify-center overflow-y-scroll">
            <div className="shadow-[0px_4px_5px_#191922] my-0 py-[18px] px-2.5 rounded-[20px] text-center bg-[#2f2753]">
                <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[10px]">
                    Artist Bio
                </span>
                <div className="m-3 tracking-[1px] text-sm text-[black]">
                    <textarea className="text-center rounded-[20px] mt-1 p-3 w-[85%] h-[120px]" value={artistBio} onChange={(event) => handleBioInput(event)}/>
                </div>
            </div>
            <div className="shadow-[0px_4px_5px_#191922] mt-[40px] py-[18px] px-2.5 rounded-[20px] text-center bg-[#2f2753]">
                <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[10px]">
                    Genres
                </span>
                <div className="m-4 px-10 tracking-[1px] text-sm text-[black]">
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={options[0]}
                    isMulti options={options}
                    />
                </div>
            </div>
            <div className="shadow-[0px_4px_5px_#191922] mt-[40px] py-[18px] px-2.5 rounded-[20px] text-center bg-[#2f2753]">
                <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[10px]">
                    Details
                </span>
                <div className="m-3 tracking-[1px] text-sm text-[black]">
                    Details here
                </div>
            </div>
        </div>
        <div className="flex flex-col w-[20%] p-3 justify-start ml-[15px]">
            <div className="shadow-[0px_4px_5px_#191922] my-0 py-[18px] px-2.5 rounded-[20px] text-center" style={{background: "linear-gradient(355deg, rgba(32,33,54,1) 0%, rgba(52,41,98,1) 100%)"}}>
                <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[30px]">
                    Social
                </span>
                <div className="flex flex-row items-center justify-center m-auto">
                    <Image src={Spotify} alt="Spotify Icon" height={28} width={28}/>
                    <input type="text" className="w-[160px] h-[25px] rounded-[10px] px-2 text-center text-xs text-[black] ml-[12px]" placeholder="http://"></input>
                </div>
                <div className="flex flex-row items-center justify-center m-auto mt-[30px]">
                    <Image src={TikTok} alt="TikTok Icon" height={31} width={31}/>
                    <input type="text" className="w-[160px] h-[25px] rounded-[10px] px-2 text-center text-xs text-[black] ml-[12px]" placeholder="http://"></input>
                </div>
                <div className="flex flex-row items-center justify-center m-auto mt-[30px]">
                    <Image src={Instagram} alt="Instagram Icon" height={28} width={28}/>
                    <input type="text" className="w-[160px] h-[25px] rounded-[10px] px-2 text-center text-xs text-[black] ml-[12px]" placeholder="http://"></input>
                </div>
                <div className="flex flex-row items-center justify-center m-auto mt-[30px] mb-6">
                    <Image src={Youtube} alt="YouTube Icon" height={28} width={28}/>
                    <input type="text" className="w-[160px] h-[25px] rounded-[10px] px-2 text-center text-xs text-[black] ml-[12px]" placeholder="http://"></input>
                </div>
            </div>
        </div>
    </div>
  );
}
