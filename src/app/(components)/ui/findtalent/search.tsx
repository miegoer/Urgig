"use client";

import "./search.css";
import React, { useEffect, useState } from "react";
import Search from "/public/search-icon.png";
import Image from "next/image";
import { musicGenres } from "@/mockData/musicGenres";
import { User } from "@/types/user";



export default function TalentSearch({
  artists,
  setFilteredSearch,
}: any) {

  const [search, setSearch] = useState<string>("");
  let [chosenGenres, setChosenGenres] = useState<string[]>([]);


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = artists.filter(
      (artist: User) =>
        search.length >= 4 &&
        artist.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSearch(filtered);
    setSearch("")
  };

  const chooseGenre = (genre: string) => {
    if (chosenGenres.includes(genre)) return;
    if (chosenGenres.length < 3) {
      setChosenGenres((prev) => [...prev, genre]);
    } else {
      return;
    }
  };

  useEffect(()=>{
    const filtered = artists.filter(
      (artist: User) =>{
        for (let genre of chosenGenres) {
          if( artist.profileDetails && !artist.profileDetails.genre.includes(genre)) return false
          else {return true}
        }
      }
    );
    setFilteredSearch(filtered);

  },[chosenGenres])


  return (
    <div
      style={{
        background:
          "linear-gradient(355deg, rgba(32,33,54,1) 0%, rgba(52,41,98,1) 100%)",
      }}
      className="mt-2 rounded-[20px] text-center bg-[#252531] shadow-[0px_0px_0px_#272525] p-4"
    >
      <div>
        <form onSubmit={onSubmit}>
          <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[7px] mb-[10px]">
            Artist's name
          </span>
          <div className="flex flex-row gap-[10px] h-[50px] justify-center items-center">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="rounded-[20px] text-[black] text-center py-[5px] px-[10px] text-sm"
            />
            <button>
              <Image
                src={Search}
                width={50}
                height={50}
                alt="search icon"
                className="m-auto mb-4 mt-4 rounded-[50%] p-3 opacity-90"
                style={{ background: "rgba(255,160,30,1) 100%" }}
              />
            </button>
          </div>
        </form>
        <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[20px] mb-[10px]">
          Genres
        </span>
        <div className="dropdown relative block">
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
              <div className="flex flex-row justify-between gap-3 items-center text-[11px]  bg-[black] h-5 text-nowrap text-[#ffa01e] rounded-[20px] p-3 m-1">
                <span>{genre}</span>
                <span
                  onClick={(e) => {
                    setChosenGenres((prev) => {
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
        </div>
      </div>
    </div>
  );
}
