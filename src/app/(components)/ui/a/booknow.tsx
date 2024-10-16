import { Ubuntu } from "next/font/google";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";
import Select, { SingleValue} from 'react-select';
import { Booking, Set } from "@/types/booking";
import { Event } from "@/types/event";
import { useState, ChangeEvent, useEffect } from 'react';
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { useParams } from "next/navigation";
import Talk from "talkjs";

interface BookNowProps {
    setOpenBooking: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ubuntu = Ubuntu({
    weight: "400",
    subsets: ["latin"],
  });

interface SelectedDate {
    value: string,
    label: string,
}
// Ditto, but for dates.

const noOptionsMessage = () => 'No Event Attached';

export const BookNow: React.FC<BookNowProps> = ({ setOpenBooking }) => {

    const params = useParams();

    const { userId }  = useTalkSession();

    const initialState:Booking = {
        name: '',
        location: '',
        offer: 0,
        sets: [{
            date: new Date,
            setTimeStart: '00:00',
            setTimeEnd: '00:00'
        }],
        genre: [],
        maxCapacity: 0,
        status: 'negotiation',
        bookingPromoterId: '',
        bookingArtistId: '',
        bookingEventId: '',
        link: ''
      }; // Initial state for empty booking request

      async function startChat() {
        try {
            const fetchMe = await fetch(`/api/users/${userId}`);
            const me = await fetchMe.json();
            console.log("me ", me);
            const fetchYou = await fetch(`/api/users/${bookingData.bookingArtistId}`);
            const you = await fetchYou.json();
            console.log("you ", you);
  
            await fetch(`https://api.talkjs.com/v1/${process.env.NEXT_PUBLIC_TALKJS_APP_ID}/users/${you._id}`, {
                method: "PUT",
                headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TALKJS_API_KEY}`,
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: `${you.name}`,
                    photoUrl: you.profileDetails.profilePicture || `https://avatar.iran.liara.run/public/boy?username=${you.name}`,
                    welcomeMessage: "Hi!"
                })
            });
            await fetch(`https://api.talkjs.com/v1/${process.env.NEXT_PUBLIC_TALKJS_APP_ID}/conversations/${bookingData.bookingArtistId}${you.name}`, {
                method: "PUT",
                headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TALKJS_API_KEY}`,
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    participants:[userId, bookingData.bookingArtistId],
                    subject: `${bookingData.name} - ${bookingData.bookingArtistId}`,
                    welcomeMessage: "Hi!"
                })
            });
            await fetch(`https://api.talkjs.com/v1/${process.env.NEXT_PUBLIC_TALKJS_APP_ID}/conversations/${bookingData.bookingArtistId}${you.name}/messages`, {
                method: "POST",
                headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TALKJS_API_KEY}`,
                "Content-Type": "application/json",
                },
                body: JSON.stringify([{
                    text: `Hi ${you.name}! I'm interested in booking you for ${bookingData.name}!`,
                    sender: userId,
                    type: "UserMessage"
                }])
            });
            } catch (error) {
                console.log(error);
            }
      }

    const [bookingData, setBookingData] = useState(initialState);
    // Empty booking request

    const [dates, setDates] = useState<{ value: string; label: string }[]>([]);
    // All date options for the selected event above, for dropdown menu.
    
    const [travelExpenses, setTravelExpenses] = useState<boolean>(false);
    // travel exp paid or unpaid

    const [comments, setComments] = useState<string>('');
    // IGNORE

    const [userEvents, setUserEvents] = useState<Event[]>([]);

    useEffect(() => {
        const getPromoterEvents = async () => {
            const response = await fetch(`/api/users/${userId}/events`);
            const data = await response.json();
            const formattedData = data.map((event: Event) => ({
                value: event,
                label: event.name
            }))
            setUserEvents(formattedData);
        };
        getPromoterEvents();
    }, [userId])
 
    const chooseEvent = (event: SingleValue<Event>) => {
        // Triggered after selecting an event
        if (event) {
            const fetchEventData = async (event: any) => {
                const response =await fetch(`/api/events/${event.value.value._id}`);
                const eventData = await response.json();
                console.log(eventData.genre);
                const date = new Date(eventData.date);
                const formattedDate = date.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                setDates([{value: formattedDate, label: formattedDate}]);
                setBookingData((prevData) => ({
                    ...prevData,
                    name: eventData.name,
                    location: eventData.location,
                    maxCapacity: eventData.maxCapacity,
                    bookingPromoterId: eventData.promoterId,
                    bookingEventId: eventData._id,
                    bookingArtistId: typeof params.id === 'string' ? params.id : '',
                    genre: eventData.genre,
                    link: eventData.link
                })); // Sets booking data with info already embedded in the event data
            };
            fetchEventData({label: event.name, value:event});
        }
    }

    const chooseDate = (date: SingleValue<SelectedDate>) => {
        // Triggered after selecting a date
        if (date) {
        setBookingData((prevData) => ({
            ...prevData,
            date: new Date(date.value),
        }));
        }
    }

    const handleOfferInput = (event:ChangeEvent<HTMLInputElement>) => {
        setBookingData((prevData) => ({
            ...prevData,
            offer: Number(event.target.value),
          }));
        }

    const handleStartInput = (event: ChangeEvent<HTMLInputElement>) => {
        setBookingData((prevData) => ({
            ...prevData,
            sets: [{ ...prevData.sets[0], setTimeStart: event.target.value }]
        }))
      };

    const handleEndInput = (event:ChangeEvent<HTMLInputElement>) => {
        setBookingData((prevData) => ({
            ...prevData,
            sets: [{ ...prevData.sets[0], setTimeEnd: event.target.value }]
        }))
    };

    const handleWebsiteInput = (event:ChangeEvent<HTMLInputElement>) => {
        setBookingData((prevData) => ({
            ...prevData,
            link: event.target.value,
          }));
    }

    const handleSubmit = async () => {
        // Will need to embed the setDetails in Sets and travelExpenses
        try {
            await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            })
            console.log(bookingData)
            startChat();
            setOpenBooking(false);
        } catch (error) {
            console.error(error);
        }
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
                    options={userEvents}
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
                            <input type="time" className="text-[black] rounded-[5px] p-2 h-[75%] w-[22%] text-center" value={bookingData.sets[0].setTimeStart} onChange={handleStartInput}/>
                            <span className="rounded-[5px] w-[120px] text-center text-xs p-3 tracking-[1.5px] lowercase mt-[1px] italic ml-[30px]">End Time:</span>
                            <input type="time" className="text-[black] text-center rounded-[5px] p-2 h-[75%] w-[22%]" value={bookingData.sets[0].setTimeEnd} onChange={handleEndInput}/>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-row mt-[20px] mb-[23px] items-center">
                            <span className="rounded-[5px] text-center text-xs p-3 tracking-[1.5px] lowercase mt-[1px] italic ml-[5%] mr-[10px]">Pay Amount:</span>
                            <input type="number" value={bookingData.offer} onChange={handleOfferInput} className="rounded-[5px] p-2 w-[19%] h-[80%] text-[black] text-center"/>
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