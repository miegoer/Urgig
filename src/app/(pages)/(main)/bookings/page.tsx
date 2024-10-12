'use client'
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { Booking } from "@/types/booking";
import  mockBookings from "@/mockData/bookings";
import { useState, useEffect } from "react";
import BookingItem from "./bookingItem";

export default function Page({ children }: { children: React.ReactNode }) {
  const { userId } = useTalkSession();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (userId) {
      const fetchBookings = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/bookings/${userId}`);
          console.log("response", response);
          setBookings(await response.json());
          // Do something with the bookingsData
        } catch (error) {
          console.error(error);
        }
      };

      fetchBookings();
    } else {
      setBookings([]);
    }
  }, [userId]);
  console.log(bookings);

  if (mockBookings.length === 0) {
    return <div>No bookings available</div>;
  } else {
    return (
      <>
        <h1>My Bookings</h1>
        {mockBookings.map((booking: Booking) => (
          <BookingItem key={booking._id} booking={booking} />
        ))}
      </>
    );
  }

}