"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Booking } from "@/types/booking";

export default function Bookings() {
  const { _id } = useParams();

  const [eventId, setEventId] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // geting eventId from params when mounting
    if (_id) setEventId(_id as string);
  }, []);

  useEffect(() => {
    const fetchBookings = () => {
      //fetching bookings from the event:
      
      fetch(`/api/events/${eventId}/bookings`)
        .then((response) => {
          if (response.ok) response.json();
        })
        .then((data) => {
            console.log(data,'--------------data')
            setBookings(data);
          
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (eventId) {
      fetchBookings();
      console.log(bookings);
    }
  }, [eventId]);

  return (
    <>
      <div className="flex flex-col justify-start  w-[600px] ml-[50px]  mt-[50px] border">
        <div className=" tracking-[1.5px] text-[white] text-sm">
          <p>BOOKINGS:</p>
        </div>

        <div className="border-t w-full h-0 self-center mt-4"></div>

        <div className="mt-3 text-xs text-[#a0aec0] ">
          {/* <p>{bookings[0].name}</p>
          <p>{bookings[1].name}</p>
          <p>{bookings[2].name}</p> */}
        </div>
      </div>
    </>
  );
}
