'use client';

import './search.css';
import { useState } from 'react';
import Search from '/public/search-icon.png';
import Image from 'next/image';
import SelectGenre from '../dashboard/selectGenre'; // Assuming this component fetches genres

export default function TalentSearch() {
    const [chosenGenres, setChosenGenres] = useState<string[]>([]); // Selected genres
    const [locationSearch, setLocationSearch] = useState<string>(''); // Location search input
    const [isSent, setIsSent] = useState<boolean>(false); // To handle form submission or other logic

    return (
        <div
            style={{ background: "linear-gradient(355deg, rgba(32,33,54,1) 0%, rgba(52,41,98,1) 100%)" }}
            className="mt-[40px] rounded-[20px] text-center bg-[#252531] shadow-[0px_0px_0px_#272525] p-4"
        >
            <form>
                <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[7px] mb-[10px]">Location</span>
                <input
                    type="text"
                    onChange={(e) => setLocationSearch(e.target.value)}
                    value={locationSearch}
                    className="rounded-[20px] text-[black] text-center py-[5px] px-[10px] text-sm"
                />

                <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[20px] mb-[10px]">Genres</span>

                {/* Selected genres */}
                {/* <div className="p-3 mt-4">
                    {chosenGenres.length > 0 ? (
                        chosenGenres.map((genre) => (
                            <span
                                key={genre}
                                className="z-10 flex flex-wrap inline-flex text-s bg-[black] text-[#ffa01e] rounded-[20px] py-1 px-3 mr-2.5 mb-2.5 tracking-[1px]"
                            >
                                {genre}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs italic">No genres added</span>
                    )}
                </div> */}

                {/* Include the SelectGenre component to fetch genres */}
                <SelectGenre setGenres={setChosenGenres} genres={chosenGenres} isSent={isSent} />
            </form>

            <Image
                src={Search}
                width={60}
                height={60}
                alt="search icon"
                className="m-auto mb-4 mt-4 rounded-[50%] p-3 opacity-90"
                style={{ background: "rgba(255,160,30,1) 100%" }}
            />
        </div>
    );
}

