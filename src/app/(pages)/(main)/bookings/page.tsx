'use client'
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import { Booking } from "@/types/booking";
import { useState, useEffect } from "react";
import BookingItem from "./bookingItem";

export default function Page({ children }: { children: React.ReactNode }) {
  const { userId, userType } = useTalkSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (userId && userType) {
      const fetchBookings = async () => {
        try {
          const response = await fetch(`/api/bookings?userId=${userId}`);
          setBookings(await response.json());
        } catch (error) {
          console.error(error);
        }
      };
      fetchBookings();
    } else {
      setBookings([]);
    }
  }, [userId, userType]);

  const filteredBookings = bookings.filter((booking: Booking) => {
    if (filterStatus === 'all') return true;
    return booking.status === filterStatus;
  });

  return (
    <>
      <h1 style={{ fontSize: "2rem", marginLeft: "25px" }}>My Bookings</h1>
      <select 
        value={filterStatus} 
        onChange={(e) => setFilterStatus(e.target.value)}
        aria-label="Filter bookings by status"
        style={{ color:"black", marginLeft: "25px", marginBottom: "25px" }}
      >
        <option value="all">all</option>
        <option value="pending">pending</option>
        <option value="confirmed">confirmed</option>
        <option value="declined">declined</option>
      </select>

      {filteredBookings.length === 0 ? (
        <div>No bookings available</div>
      ) : (
        filteredBookings.map((booking: Booking) => (
          <BookingItem key={booking._id} booking={booking} userType={userType!} />
        ))
      )}
    </>
  );

}