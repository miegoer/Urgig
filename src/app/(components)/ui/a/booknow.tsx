import { Ubuntu } from "next/font/google";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";
import Select from 'react-select';
import mockBookings from "@/mockData/bookings";
import { Set, Booking } from "@/types/booking";
import { useState } from 'react';

interface BookNowProps {
    setOpenBooking: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ubuntu = Ubuntu({
    weight: "400",
    subsets: ["latin"],
  });

interface SelectedEvent {
    value: Booking,
    label: string,
}

const noOptionsMessage = () => 'No Event Attached';

export const BookNow: React.FC<BookNowProps> = ({ setOpenBooking }) => {

    const [offer, setOffer] = useState<number>(0);
    const [offerType, setOfferType] = useState<string>('');
    const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
    const [dates, setDates] = useState<{ value: string; label: string }[]>([]);
    // const [eventDate, setEventDate] = useState<string>('');

    const bookings:SelectedEvent[] = mockBookings.map((event) => ({
        value: event,
        label: event.name,
      }));
 
    const chooseEvent = (event:SelectedEvent) => {
        setSelectedEvent(event);
        const formattedDates = event.value.sets.map((set) => ({
            value: set.date.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
            label: set.date.toDateString(), // Format as readable date string
          }));
          setDates(formattedDates);
      };
  
    // Work in Progress

    return (
        <div className="absolute bg-[#20202A] text-[white] p-8 rounded-[20px] w-[40%] h-[89%]">
            <h1 className={`${ubuntu.className} text-center text-2xl text-[#ccff69] tracking-[1px] mb-[15px]`}>Booking Request</h1>
            <div className="h-[28%]">
            <span className="block text-[#ccff69] text-[11px] tracking-[1.5px] uppercase mt-[1px] mb-[25px] border-b-[#ccff69] border-b border-solid">Event Details</span>
            <div className="flex flex-col">
                <div className="flex flex-row justify-center items-center w-[100%]">
                    <span className="rounded-[5px] ml-[-20px] text-center text-xs tracking-[1.5px] lowercase italic w-[25%]">attach event:</span>
                    <Select className="z-60 w-[55%] text-[black] text-center"
                    classNamePrefix="select"
                    name="event"
                    options={bookings}
                    onChange={(e) => chooseEvent(e)}
                    />
                </div>
                <div className="flex flex-row justify-center items-center w-[100%]">
                    <span className="rounded-[5px] ml-[-20px] text-center text-xs tracking-[1.5px] lowercase italic w-[25%]">date:</span>
                    <Select className="z-58 w-[55%] text-[black] text-center my-[20px]"
                        classNamePrefix="select"
                        name="date"
                        options={dates}
                        noOptionsMessage={noOptionsMessage}/>
                </div>
            </div>
            </div>
            <div className="h-[34%]">
                <span className="block text-[11px] tracking-[1.5px] uppercase mt-[1px] mb-[20px] border-b-[#ccff69] text-[#ccff69] border-b border-solid">Gig Details</span>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-center border-b-[#434352] border-b border-solid">
                        <div className="flex flex-row mb-[18px] items-center">
                            <span className="rounded-[5px] w-[120px] text-center text-xs p-3 tracking-[1.5px] lowercase mt-[1px] italic ml-[-15px]">Start Time:</span>
                            <input type="time" className="rounded-[5px] p-2 h-[75%] w-[20%]"/>
                            <span className="rounded-[5px] w-[120px] text-center text-xs p-3 tracking-[1.5px] lowercase mt-[1px] italic ml-[30px]">End Time:</span>
                            <input type="time" className="rounded-[5px] p-2 h-[75%] w-[20%]"/>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-row mt-[20px] mb-[23px] items-center">
                            <span className="rounded-[5px] text-center text-xs p-3 tracking-[1.5px] lowercase mt-[1px] italic ml-[5%] mr-[10px]">Pay Amount:</span>
                            <input type="text" className="rounded-[5px] p-2 w-[19%] h-[80%]"/>
                            <span className="rounded-[5px] ml-[30px] w-[95px] text-center text-xs p-3 tracking-[1.5px] lowercase mt-[1px] italic">Pay Type:</span>
                            <Dropdown><DropdownTrigger>
                                <span className="z-10 bg-[black] text-[white] py-3 uppercase text-[12px] px-[24px] rounded-[10px] tracking-[3px] transition-all duration-200 cursor-pointer">
                                    {offerType === '' ? 'Choose' : offerType}
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
                    </div>
                </div>
                <span className="block text-[11px] tracking-[1.5px] uppercase mt-[1px] mb-[20px] border-b-[#ccff69] border-b border-solid"></span>
            </div>
            <div className="h-[24%] flex justify-center p-4">
                <textarea className="m-4 rounded-[5px] w-[80%] p-3" placeholder="Add any extra details or comments here"></textarea>
            </div>
            <div className="flex flex-row justify-between mt-[10px]">
                <button className="border border-solid border-[#ccff69] rounded-[20px] py-2 px-8 ml-3 text-[#ccff69]" onClick={() => setOpenBooking(false)}>
                    Back
                </button>
                <button className={`${ubuntu.className} border border-solid border-[#20202A] rounded-[20px] text-[#20202A] bg-[#ccff69] py-2 px-8 mr-3`}>
                    Submit
                </button>
            </div>
    
        </div>
    )
}