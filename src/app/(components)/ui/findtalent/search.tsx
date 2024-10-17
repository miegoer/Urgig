// 'use client';

// import './search.css';
// import { useState } from 'react';
// import Search from '/public/search-icon.png';
// import Image from 'next/image';
// import SelectGenre from '../dashboard/selectGenre'; // Assuming this component fetches genres

// export default function TalentSearch() {
//     const [chosenGenres, setGenres] = useState<string[]>([]); // Selected genres
//     const [locationSearch, setLocationSearch] = useState<string>(''); // Location search input
//     const [isSent, setIsSent] = useState<boolean>(false); // To handle form submission or other logic

//     return (
//         <div
//             style={{ background: "linear-gradient(355deg, rgba(32,33,54,1) 0%, rgba(52,41,98,1) 100%)" }}
//             className="mt-[40px] rounded-[20px] text-center bg-[#252531] shadow-[0px_0px_0px_#272525] p-4"
//         >
//             <form>
//                 <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[7px] mb-[10px]">Location</span>
//                 <input
//                     type="text"
//                     onChange={(e) => setLocationSearch(e.target.value)}
//                     value={locationSearch}
//                     className="rounded-[20px] text-[black] text-center py-[5px] px-[10px] text-sm"
//                 />

//                 <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[20px] mb-[10px]">Genres</span>

//                 {/* Selected genres */}
//                 {/* <div className="p-3 mt-4">
//                     {chosenGenres.length > 0 ? (
//                         chosenGenres.map((genre) => (
//                             <span
//                                 key={genre}
//                                 className="z-10 flex flex-wrap  text-s bg-[black]  rounded-[20px] py-1 px-3 mr-2.5 mb-2.5 tracking-[1px]"
//                             >
//                                 {genre}
//                             </span>
//                         ))
//                     ) : (
//                         <span className="text-xs italic">No genres added</span>
//                     )}
//                 </div> */}

//                 {/* Include the SelectGenre component to fetch genres */}
//                 <SelectGenre setGenres={setGenres} genres={chosenGenres} />
//             </form>

//             <Image
//                 src={Search}
//                 width={60}
//                 height={60}
//                 alt="search icon"
//                 className="m-auto mb-4 mt-4 rounded-[50%] p-3 opacity-90"
//                 style={{ background: "rgba(255,160,30,1) 100%" }}
//             />
//         </div>
//     );
// }

"use client";

import "./search.css";
import React, { useEffect, useState } from "react";
import Search from "/public/search-icon.png";
import Image from "next/image";
import { musicGenres } from "@/mockData/musicGenres";
import { User } from "@/types/user";
import SelectGenre from "../dashboard/selectGenre";

export default function TalentSearch({ artists, setFilteredSearch }: any) {
  const [search, setSearch] = useState<string>("");
  let [genres, setGenres] = useState<string[]>([]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = artists.filter((artist: User) =>
      artist.location
        ? search.length >= 4 &&
          artist.location.toLowerCase().includes(search.toLowerCase())
        : false
    );
    setFilteredSearch(filtered);
    setSearch("");
  };

  const chooseGenre = (genre: string) => {
    if (genres.includes(genre)) return;
    if (genres.length < 3) {
      setGenres((prev) => [...prev, genre]);
    } else {
      return;
    }
  };

  useEffect(() => {
    const filtered = artists.filter((artist: User) => {
      if (!artist.profileDetails && !artist.profileDetails.genre) return false;
      return genres.every((genre) =>
        artist.profileDetails.genre.includes(genre)
      );
    });
    setFilteredSearch(filtered);
  }, [genres]);

  return (
    <div
      style={{
        background:
          "linear-gradient(355deg, rgba(32,33,54,1) 0%, rgba(52,41,98,1) 100%)",
      }}
      className="mt-2 rounded-[20px] text-center bg-[#252531] shadow-[0px_0px_0px_#272525] p-3"
    >
        <form onSubmit={onSubmit} className="p-2">
          <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[7px] mb-[10px]">
            Artist's name
          </span>
          <div className="flex flex-row gap-[10px] h-[50px] justify-center items-center">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="rounded-[20px] text-[black] text-center py-[5px]  text-sm h-[2.5rem] w-full"
            />
          </div>
          <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[20px] mb-[10px] ">
            Genres
          </span>
          <SelectGenre setGenres={setGenres} genres={genres}/>
          <button>
            <Image
              src={Search}
              width={50}
              height={50}
              alt="search icon"
              className="m-auto mb-4 mt-4 rounded-[50%] p-1 opacity-90"
              style={{ background: "rgba(255,160,30,1) 100%" }}
            />
          </button>
        </form>
        {/* <div className="dropdown relative block">
          <button className="dropbtn bg-[#ccff69] text-[black] text-xs px-4 py-2 border-[none] rounded-[20px]">
            Choose Genre Tags
          </button>

          <div
            className="dropdown-content hidden absolute bg-[#f1f1f1] bg-opacity-30 min-w-[160px]  shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)]
                    [&::-webkit-scrollbar]:w-0
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-black-10
                    [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {musicGenres.map((genre, index) => (
              <span
                className="list-item "
                key={genre}
                onClick={(e) => {
                  chooseGenre(genre);
                }}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className="p-3 mt-4 flex flex-wrap flex-row">
          {chosenGenres.length > 0 ? (
            chosenGenres.map((genre, index) => (
              <div className="flex flex-row justify-between gap-3 items-center text-[11px]  bg-[black] h-5 text-nowrap text-[#ccff69] rounded-[8px] p-3 m-1">
                <span>{genre}</span>
                <span
                  onClick={(e) => {
                    setGenres((prev) => {
                      const newGenres = [...prev];
                      newGenres.splice(index, 1);
                      return newGenres;
                    });
                  }}
                >
                  X
                </span>
              </div>
            ))
          ) : (
            <span className="text-xs italic ">No genres added</span>
          )}
        </div> */}
      </div>
    
  );
}
