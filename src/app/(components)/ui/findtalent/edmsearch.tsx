'use client'

import './search.css'
import { useState } from 'react'

export default function TalentSearchEDM() {

    let [chosenGenres, setChosenGenres] = useState<Genre[]>([]);
    
    type Genre = string;

    const chooseGenre = (genre: Genre) => {
        setChosenGenres((prev) => [...prev, genre]);
        console.log(chosenGenres)
    }
    

    return (
        <div style={{background: "linear-gradient(355deg, rgba(32,33,54,1) 0%, rgba(52,41,98,1) 100%)"}} className="mt-[40px] rounded-[20px] h-[80%] text-center bg-[#252531] shadow-[0px_0px_0px_#272525] p-4">
             <form>
                <span className="block text-[11px] tracking-[1px] uppercase ml-2.5 mr-0 mt-[3px] mb-[18px]">Find EDM Talent</span>
                <div className="dropdown relative block">
                    <div className="block">Location</div>
                    <button className="dropbtn bg-[#ccff69] text-[black] text-base px-4 py-2 border-[none]">Add Tags</button>
                    <div className="dropdown-content hidden absolute bg-[#f1f1f1] min-w-[160px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] z-[1]">
                        <span className="list-item" onClick={()=>{chooseGenre('acoustic')}}>Acoustic</span>
                        <span className="list-item" onClick={()=>{chooseGenre('electronic')}}>Electronic</span>
                        <span className="list-item" onClick={()=>{chooseGenre('jazz')}}>Jazz</span>
                        <span className="list-item" onClick={()=>{chooseGenre('metal')}}>Metal</span>
                        <span className="list-item" onClick={()=>{chooseGenre('techno')}}>Techno</span>
                    </div>
                </div>
            </form>
        </div>
    )
}