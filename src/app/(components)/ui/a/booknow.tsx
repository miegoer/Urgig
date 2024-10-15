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
// This type is a readable format for the dropdown menu as it requires a label property.

interface SelectedDate {
    value: Date,
    label: string,
}
// Ditto, but for dates.

const noOptionsMessage = () => 'No Event Attached';

export const BookNow: React.FC<BookNowProps> = ({ setOpenBooking }) => {

    const initialState:Booking = {
        _id: '',
        name: '',
        location: '',
        offer: 0,
        sets: [],
        expectedGenre: [],
        maxCapacity: 0,
        status: 'pending',
        bookingPromoterId: '',
        bookingArtistId: '',
        bookingEventId: '',
        link: ''
      }; // Initial state for empty booking request

    const initialSet: Set = {
        _id: '',
        date: new Date,
        setTimeStart: '',
        setTimeEnd: ''
    } // Initial state for empty set, which will be added to 'sets' above

    const [bookingData, setBookingData] = useState(initialState);
    // Empty booking request

    const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
    // The above is a separate type which includes a label for the dropdown menu.

    const [dates, setDates] = useState<{ value: string; label: string }[]>([]);
    // All date options for the selected event above, for dropdown menu.

    const [offer, setOffer] = useState<number>(0);
    // sets offer amount
    
    const [travelExpenses, setTravelExpenses] = useState<boolean>(false);
    // travel exp paid or unpaid

    const [startTime, setStartTime] = useState<string>('');
    // sets start time of set

    const [endTime, setEndTime] = useState<string>('');
    // sets end time of set

    const [setDetails, setSetDetails] = useState<Set>(initialSet);
    // pulls all set details

    const [comments, setComments] = useState<string>('');
    // IGNORE

    const events:SelectedEvent[] = mockEvents.map((event) => ({
        value: event,
        label: event.name,
      }));
 
    const chooseEvent = (event: SelectedEvent) => {
        // Triggered after selecting an event
        setSelectedEvent(event);
        const formattedDate = event.value.date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        setDates([{value: formattedDate, label: formattedDate}]); // Fills dropdown menu with corresponding dates
        setBookingData((prevData) => ({
            ...prevData,
            name: event.value.name,
            location: event.value.location,
            maxCapacity: event.value.maxCapacity,
            bookingPromoterId: event.value.promoterId,
            expectedGenre: event.value.genre
        })); // Sets booking data with info already embedded in the event data
    }

    const chooseDate = (date: SelectedDate) => {
        // Triggered after selecting a date
        setBookingData((prevData) => ({
            ...prevData,
            date: date.value,
        }));
    }

    // const parseDateString = (dateString:string) => {
    //     const [day, month, year] = dateString.split(' ');
    //     const months = {
    //       January: 0, February: 1, March: 2, April: 3,
    //       May: 4, June: 5, July: 6, August: 7,
    //       September: 8, October: 9, November: 10, December: 11,
    //     };
    //     return new Date(year, months[month], day);
    // }; 
    // Converts dates in string-form back to a date type. Unclear if needed.


    const handleOfferInput = (event:ChangeEvent<HTMLInputElement>) => {
        setOffer(Number(event.target.value));
        setBookingData((prevData) => ({
            ...prevData,
            offer: Number(event.target.value),
          }));
        }

    const handleStartInput = (event: ChangeEvent<HTMLInputElement>) => {
        setStartTime(event.target.value)
        setSetDetails((prevData) => ({
            ...prevData,
            setTimeStart: event.target.value
        }))
      };

    const handleEndInput = (event:ChangeEvent<HTMLInputElement>) => {
        setEndTime(event.target.value)
        setSetDetails((prevData) => ({
            ...prevData,
            setTimeEnd: event.target.value
        }))
    }

    const handleWebsiteInput = (event:ChangeEvent<HTMLInputElement>) => {
        setBookingData((prevData) => ({
            ...prevData,
            link: event.target.value,
          }));
    }

    const handleSubmit = () => {
        // Will need to embed the setDetails in Sets and travelExpenses
        console.log(bookingData)
    }


    const handleCommentsInput = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setComments(event.target.value);
    } // IGNORE

    return (
        <div className="absolute bg-[#20202A] text-[white] p-8 rounded-[20px] w-[40%] h-[95%]">
            <h1 className={`${ubuntu.className} text-center text-2xl text-[#ccff69] tracking-[1px] mb-[15px]`}>Booking Request</h1>
            <div className="h-[32%]">
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
                <div className="flex flex-row justify-center items-center w-[100%]">
                    <span className="rounded-[5px] ml-[-20px] text-center text-xs tracking-[1.5px] lowercase italic w-[25%]">website:</span>
                    <input type="text" className="z-58 rounded-[5px] w-[55%] p-1 text-[black] text-center text-sm mb-[20px]" value={bookingData.link} onChange={handleWebsiteInput}/>
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
                            <span className="rounded-[5px] ml-[30px] w-[110px] text-center text-xs p-3 tracking-[1.5px] lowercase mt-[1px] italic">Travel Paid:</span>
                            <span className="z-15 bg-[black] text-[white] py-3 uppercase text-[12px] px-[24px] rounded-[10px] tracking-[3px] transition-all duration-200 cursor-pointer" onClick={() => setTravelExpenses(!travelExpenses)}>
                                {travelExpenses === false ? 'No' : 'Yes'}
                            </span>
                        </div>
                    </div>
                </div>
                <span className="block text-[11px] tracking-[1.5px] uppercase mt-[1px] mb-[20px] border-b-[#ccff69] border-b border-solid"></span>
            </div>
            <div className="h-[20%] flex justify-center p-4">
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