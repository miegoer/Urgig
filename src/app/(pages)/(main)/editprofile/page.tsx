'use client'

import mockUsers from "@/mockData/user"
import {useState, ChangeEvent} from 'react';
import Image from "next/image";

export default function EditProfile () {
    const [artistName, setArtistName] = useState(mockUsers[0].name);
    const [artistLocation, setArtistLocation] = useState(mockUsers[0].location);

    const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
        setArtistName(event.target.value);
    };

    const handleLocationInput = (event: ChangeEvent<HTMLInputElement>) => {
        setArtistLocation(event.target.value);
    };

    return (
    <div className="flex flex-row">
        <div className="flex flex-col w-[29%] p-3 justify-center">
            <div className="shadow-[0px_0px_0px_#272525] mx-[30px] my-0 py-[18px] px-2.5 rounded-[20px] text-center bg-[#2f2753]">
                <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[10px]">
                    Artist Name
                </span>
                <div className="m-3 tracking-[1px] text-sm text-[black]">
                    <input type="text" className="text-center rounded-[20px] p-2 w-[80%]" value={artistName} onChange={(event) => handleNameInput(event)}/>
                </div>
            </div>
            <div className="shadow-[0px_0px_0px_#272525] mx-[30px] mt-[30px] my-0 py-[18px] px-2.5 rounded-[20px] bg-[#2f2753] text-center">
                <span className="block text-[11px] text-[#ccff69] tracking-[1px] uppercase mt-[7px] mb-[10px]">
                    Location
                </span>
                <div className="m-3 tracking-[1px] text-sm text-[black]">
                    <input type="text" className="text-center rounded-[20px] p-2 w-[80%]" value={artistLocation} onChange={(event) => handleLocationInput(event)}/>
                </div>
            </div>
            <div className="shadow-[0px_0px_0px_#272525] mx-[30px] mt-[30px] py-[18px] px-2.5 rounded-[20px] bg-[#2f2753]">
                <span className="block text-center text-[#ccff69] text-[11px] tracking-[1px] uppercase mt-[7px] mb-[15px]">
                    Profile Photo
                </span>
                <div className="my-3 flex flex-row justify-center rounded-[20px] hover:bg-[#252531] transition-all duration-200 cursor-pointer p-3">
                    <Image src='/mockUsers/DJFrankenstein.png' alt="Current Profile Photo" className="rounded-[20px]" width={110} height={110}/>
                    <div className="flex flex-col items-center justify-center w-[110px] h-[110px] tracking-[1px] text-xs ml-3">
                        <Image src='/upload-icon.png' alt="Upload Photo Icon" width={25} height={25}/>
                        <span className="text-center mt-3">Upload New Profile Photo</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}