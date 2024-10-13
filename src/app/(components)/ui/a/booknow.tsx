import { Ubuntu } from "next/font/google";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";

interface BookNowProps {
    setOpenBooking: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const ubuntu = Ubuntu({
    weight: "400",
    subsets: ["latin"],
  });

export const BookNow: React.FC<BookNowProps> = ({ setOpenBooking }) => {
  
    // Work in Progress

    return (
        <div className="absolute bg-[#20202A] text-[white] p-8 z-100 rounded-[20px] w-[50%] h-[60%]">
            <h1 className={`${ubuntu.className} text-center text-2xl text-[#ccff69] tracking-[1px]`}>Booking Request</h1>
            <div className="h-[39%]">
                Attach an Event:
            </div>
            <div className="h-[39%]">
                Payment Info:
            
            <input type="text" className="rounded-[10px] p-1.5" placeholder="Amount"/>
            <Dropdown><DropdownTrigger>
            <span className="bg-[#ccff69] text-[black] p-3 uppercase text-[12px] mx-[24px] my-[6px] rounded-[10px] tracking-[3px] transition-all duration-200 cursor-pointer">
                Payment Type
            </span>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="Hourly" className="text-center bg-[#20202A] p-3 hover:bg-[#3525de] shadow-[0px_4px_5px_#191922] transition-all duration-200 rounded-[10px]">
                <span className="text-[#b7c4ff] p-3 uppercase text-[12px] mx-[24px] my-[6px] tracking-[3px] transition-all duration-200">
                Hourly
                </span>
                </DropdownItem>
                <DropdownItem key="Flat" className="text-center bg-[#20202A] p-3 hover:bg-[#3525de] shadow-[0px_4px_5px_#191922] transition-all duration-200 rounded-[10px]">
                <span className="text-[#b7c4ff] p-3 uppercase text-[12px] mx-[24px] my-[6px] tracking-[3px] transition-all duration-200">
                Flat Fee
                </span>
                </DropdownItem>
            </DropdownMenu></Dropdown>
            </div>

            <div className="flex flex-row justify-between">
                <button className="border border-solid border-[#ccff69] rounded-[20px] py-3 px-8 ml-3 text-[#ccff69]" onClick={() => setOpenBooking(false)}>
                    Back
                </button>
                <button className={`${ubuntu.className} border border-solid border-[#20202A] rounded-[20px] text-[#20202A] bg-[#ccff69] py-3 px-8 mr-3`}>
                    Submit
                </button>
            </div>
    
        </div>
    )
}