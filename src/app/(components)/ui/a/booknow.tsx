import { Ubuntu } from "next/font/google";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";
import Select from 'react-select';
import mockEvents from "@/mockData/events";
import { Booking, Set } from "@/types/booking";
import { useState, ChangeEvent } from 'react';

interface BookNowProps {
    setOpenBooking: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ubuntu = Ubuntu({
    weight: "400",
    subsets: ["latin"],
  });

interface SelectedEvent {
    value: Event,
    label: string,
}

interface SelectedDate {
    value: Date,
    label: string,
}

const noOptionsMessage = () => 'No Event Attached';

export const BookNow: React.FC<BookNowProps> = ({ setOpenBooking }) => {

    const initialState:Booking = {
        _id: '',
        name: '',
        // link?: string;
        location: '',
        offer: 0,
        sets: [],
        genre: [],
        maxCapacity: 0,
        status: 'pending',
        bookingPromoterId: '',
        bookingArtistId: '',
        bookingEventId: '',
        link: ''
      };

    const initialSet: Set = {
        _id: '',
        date: Date,
        setTimeStart: '',
        setTimeEnd: ''
    }
      

    const [bookingData, setBookingData] = useState(initialState);

    const [offer, setOffer] = useState<number>(0);
    const [payType, setPayType] = useState<string>('');
    const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [comments, setComments] = useState<string>('');
    const [setDetails, setSetDetails] = useState<Set>({})

    const [dates, setDates] = useState<{ value: string; label: string }[]>([]);

    const events:SelectedEvent[] = mockEvents.map((event) => ({
        value: event,
        label: event.name,
      }));
 
    const chooseEvent = (event: SelectedEvent) => {
        setSelectedEvent(event);

        const formattedDate = event.value.date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

        setDates([{value: formattedDate, label: formattedDate}]);

        setBookingData((prevData) => ({
            ...prevData,
            name: event.value.name,
            location: event.value.location,
            maxCapacity: event.value.maxCapacity,
            bookingPromoterId: event.value.promoterId,
            genre: event.value.genre
        }));
    }

    const chooseDate = (date: SelectedDate) => {
        setBookingData((prevData) => ({
            ...prevData,
            date: date.value,
        }));
    }

    const handleOfferInput = (event:ChangeEvent<HTMLInputElement>) => {
        setOffer(Number(event.target.value));
        setBookingData((prevData) => ({
            ...prevData,
            offer: Number(event.target.value),
          }));
    }

    const handleTypeInput = (val:string) => {
        setPayType(val)
    }

    const handleStartInput = (event: ChangeEvent<HTMLInputElement>) => {
        setBookingData((prevData) => ({
          ...prevData,
          sets: prevData.sets[0].map((set, index) => 
            index === 0 
              ? { ...set, setTimeStart: event.target.value } 
              : set
          ),
        }));
      };
      

    const handleEndInput = (event:ChangeEvent<HTMLInputElement>) => {
        setBookingData((prevData) => ({
            ...prevData,
            sets: prevData.sets.map((set, index) => 
              index === 0 
                ? { ...set, setTimeEnd: event.target.value } 
                : set
            ),
          }));
    }

    const handleCommentsInput = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setComments(event.target.value);
    }

    const handleSubmit = () => {
        console.log(bookingData)
    }

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
                    options={events}
                    onChange={(e) => chooseEvent(e)}
                    />
                </div>
                <div className="flex flex-row justify-center items-center w-[100%]">
                    <span className="rounded-[5px] ml-[-20px] text-center text-xs tracking-[1.5px] lowercase italic w-[25%]">date:</span>
                    <Select className="z-58 w-[55%] text-[black] text-center my-[20px]"
                        classNamePrefix="select"
                        name="date"
                        options={dates}
                        onChange={(e) => chooseDate(e)}
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
                            <input type="time" className="text-[black] rounded-[5px] p-2 h-[75%] w-[22%] text-center" value={startTime} onChange={handleStartInput}/>
                            <span className="rounded-[5px] w-[120px] text-center text-xs p-3 tracking-[1.5px] lowercase mt-[1px] italic ml-[30px]">End Time:</span>
                            <input type="time" className="text-[black] text-center rounded-[5px] p-2 h-[75%] w-[22%]" value={endTime} onChange={handleEndInput}/>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-row mt-[20px] mb-[23px] items-center">
                            <span className="rounded-[5px] text-center text-xs p-3 tracking-[1.5px] lowercase mt-[1px] italic ml-[5%] mr-[10px]">Pay Amount:</span>
                            <input type="number" value={offer} onChange={handleOfferInput} className="rounded-[5px] p-2 w-[19%] h-[80%] text-[black] text-center"/>
                            <span className="rounded-[5px] ml-[30px] w-[95px] text-center text-xs p-3 tracking-[1.5px] lowercase mt-[1px] italic">Pay Type:</span>
                            <Dropdown><DropdownTrigger>
                                <span className="z-15 bg-[black] text-[white] py-3 uppercase text-[12px] px-[24px] rounded-[10px] tracking-[3px] transition-all duration-200 cursor-pointer">
                                    {payType === '' ? 'Choose' : payType}
                                </span>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="Hourly" className="text-center bg-[#20202A] p-3 hover:bg-[#3525de] shadow-[0px_4px_5px_#191922] transition-all duration-200 rounded-[10px_10px_0px_0px]" 
                                onClick={() => handleTypeInput('Hourly')}>
                                    <span className="text-[#b7c4ff] p-3 uppercase text-[12px] mx-[24px] my-[6px] tracking-[3px] transition-all duration-200">
                                        Hourly
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="Flat" className="text-center bg-[#20202A] p-3 hover:bg-[#3525de] shadow-[0px_4px_5px_#191922] transition-all duration-200" onClick={() => handleTypeInput('Fixed')} >
                                    <span className="text-[#b7c4ff] p-3 uppercase text-[12px] mx-[24px] my-[6px] tracking-[3px] transition-all duration-200">
                                        Fixed
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="set" className="text-center bg-[#20202A] p-3 hover:bg-[#3525de] shadow-[0px_4px_5px_#191922] transition-all duration-200 rounded-[0px_0px_10px_10px]" onClick={() => handleTypeInput('Per Set')} >
                                    <span className="text-[#b7c4ff] p-3 uppercase text-[12px] mx-[24px] my-[5px] tracking-[3px] transition-all duration-200">
                                        Per Set
                                    </span>
                                </DropdownItem>
                            </DropdownMenu></Dropdown>
                        </div>
                    </div>
                </div>
                <span className="block text-[11px] tracking-[1.5px] uppercase mt-[1px] mb-[20px] border-b-[#ccff69] border-b border-solid"></span>
            </div>
            <div className="h-[22%] flex justify-center p-4">
                <textarea className="m-3 rounded-[5px] w-[80%] p-3 text-[black] text-sm" placeholder="Add any extra details or comments here" value={comments} onChange={handleCommentsInput}></textarea>
            </div>
            <div className="flex flex-row justify-between mt-[10px]">
                <button className="border border-solid border-[#ccff69] rounded-[20px] py-2 px-8 ml-3 text-[#ccff69]" onClick={() => setOpenBooking(false)}>
                    Back
                </button>
                <button className={`${ubuntu.className} border border-solid border-[#20202A] rounded-[20px] text-[#20202A] bg-[#ccff69] py-2 px-8 mr-3`} onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )
}