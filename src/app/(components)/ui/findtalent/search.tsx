'use client'

import './search.css'
import { useState } from 'react'
import Search from '/public/search-icon.png'
import Image from 'next/image'

const genres = [
    'Acoustic', 'Alternative', 'EDM', 'Electronic', 'Grunge', 'House', 'Jazz', 'Pop', 'Punk', 'Pop-Punk', 'Rap', 'RnB', 'Reggae', 'Ska', 'Techno', 'Trance'
]

export default function TalentSearch() {

    let [chosenGenres, setChosenGenres] = useState<Genre[]>([]);
    const [locationSearch, setLocationSearch] = useState<string>('');
    
    type Genre = string;

    const chooseGenre = (genre: Genre) => {
        if (chosenGenres.length < 5) {
            setChosenGenres((prev) => [...prev, genre]);
        } else {
            alert('Reached maximum genres for search')
        }
    }

    return (
        <div style={{background: "linear-gradient(355deg, rgba(32,33,54,1) 0%, rgba(52,41,98,1) 100%)"}} className="mt-[40px] rounded-[20px] text-center bg-[#252531] shadow-[0px_0px_0px_#272525] p-4">
             <form>
                <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[7px] mb-[10px]">Location</span>
                <input type="text" onChange={(e) => setLocationSearch(e.target.value)} value={locationSearch} className="rounded-[20px] text-[black] text-center py-[5px] px-[10px] text-sm"/>
                <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[20px] mb-[10px]">Genres</span>
                <div className="dropdown relative block">
                    <button className="dropbtn bg-[#ccff69] text-[black] text-xs px-4 py-2 border-[none] rounded-[20px]">Choose Genre Tags</button>
                    <div className="dropdown-content hidden absolute bg-[#f1f1f1] min-w-[160px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] z-[1]">
                        {genres.map((genre) => (
                            <span className="list-item" key={genre} onClick={()=>{chooseGenre(genre)}}>{genre}</span>
                        ))}
                    </div>
                </div>
                <div className="p-3 mt-4">{chosenGenres.length > 0 ? chosenGenres.map((genre) => <span className="z-10 flex flex-wrap inline-flex text-s bg-[black] text-[#ffa01e] rounded-[20px] py-1 px-3 mr-2.5 mb-2.5 tracking-[1px]">{genre}</span>) : <span className="text-xs italic">No genres added</span>}</div>
            </form>
            <Image src={Search} width={60} height={60} alt="search icon" className="m-auto mb-4 mt-4 rounded-[50%] p-3 opacity-90" style={{background: "rgba(255,160,30,1) 100%" }}/>
        </div>
    )
}