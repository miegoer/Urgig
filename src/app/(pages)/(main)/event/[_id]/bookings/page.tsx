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
  }, [_id]);

  useEffect(() => {
    //fetching bookings from the event:
    const fetchBookings = () => {
      fetch(`/api/events/${eventId}/bookings`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
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

  const confirmed = bookings.filter(
    (booking) => booking.status === "confirmed"
  );
  const pending = bookings.filter((booking) => booking.status === "pending");

  return (
    <>
      <div className="flex flex-col justify-start  w-[550px] ml-[50px]  mt-[50px] mb-0">
        <p className=" text-xs text-[#a0aec0]"> Confirmed Bookings:</p>

        <div className="border-t w-full h-0 self-center mt-1"></div>
        <div className="mt-2">
          {confirmed.map((booking) => (
            <div key={booking._id} className="grid grid-cols-11 ">
              <p className="col-span-5">{booking.name}</p>
              <p className="text-xs text-[#a0aec0] col-span-3 text-center">
                {new Date(booking.sets[0].date).toLocaleDateString('en-US')}, at {booking.sets[0].setTimeStart}
                </p>
              <p className="text-xs text-[#a0aec0] col-span-2 text-center">{booking.offer} $</p>
              <div className="text-xs text-[#a0aec0] col-span-1 text-end">View</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-start  w-[550px] ml-[50px]  mt-[50px] mb-0">
        <p className=" text-xs text-[#a0aec0]"> Pending Bookings:</p>

        <div className="border-t w-full h-0 self-center mt-1"></div>
        <div className="mt-2">
        {pending.map((booking) => (
            <div key={booking._id} className="grid grid-cols-11 ">
              <p className="col-span-5">{booking.name}</p>
              <p className="text-xs text-[#a0aec0] col-span-3 text-center">
                {new Date(booking.sets[0].date).toLocaleDateString('en-US')}, at {booking.sets[0].setTimeStart}
                </p>
              <p className="text-xs text-[#a0aec0] col-span-2 text-center">{booking.offer} $</p>
              <div className="text-xs text-[#a0aec0] col-span-1 text-end">View</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
