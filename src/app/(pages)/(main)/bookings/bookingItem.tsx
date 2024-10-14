import './bookingItem.css'
import { Booking } from "@/types/booking";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

const BookingItem: React.FC<{booking: Booking, userType: string}> = ({booking, userType}) => {
  const [promoter, setPromoter] = useState<User>();
  const accountType = userType;
  console.log(booking);

  useEffect(() => {
    const getPromoter = async () => {
      try {
        const response = await fetch(`/api/users/${booking.bookingPromoterId}`);
        const data = await response.json();
        setPromoter(data);
      } catch (error) {
        console.error(error);
      }
    }
    getPromoter();
  }, [])

  const AcceptBooking = async () => {
    try {
      await fetch(`/api/bookings/${booking._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: 'accepted'})
      })

      const userResponse = await fetch(`/api/users/${booking.bookingArtistId}`);
      const userData = await userResponse.json();

      await fetch(`/api/users/${booking.bookingArtistId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({events: [...userData.events, booking.bookingEventId]})
      })
      window.location.reload();
    } catch (error) {
      console.error(error);
    };
  };

  const DeclineBooking = async () => {
    try {
      await fetch(`/api/bookings/${booking._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: 'declined'})
      })
      window.location.reload();
    } catch (error) {
      console.error(error);
    };
  }

 return (
  <div className="shadow-[0px_4px_5px_#191922] h-[200px] rounded-[20px] bg-[#252531] mb-[20px] p-3 parent" style={{margin: "25px"}}>
    <div className='div1'>
      <h1>{booking.name}</h1>
        <div>
          Event Genre:
          {booking.expectedGenre.map((genre) => (
            <h3 key={genre}>{genre}</h3>
          ))}
        </div>
    </div>
    <div className='div2'>
      <div className='subdiv1'>
          <h3>{new Date(booking.sets[0].date).toDateString()}</h3>
          <p>{booking.sets[0].setTimeStart} - {booking.sets[0].setTimeEnd}</p>
      </div>
      <div className='subdiv2'>
          <h2>Max Capacity: {booking.maxCapacity}</h2>
      </div>
      <div className='subdiv3'>
          <h2>{booking.location}</h2>
      </div>
    </div>
    <div className='div5'>
      <h2>Offer: ${booking.offer}</h2>
    </div>
    <div className='div6'>
      <Link href={`/profile/${booking.bookingPromoterId}`}>Promoter: {promoter?.name || 'Unknown'}</Link>
      <Link href={new URL(booking.link!)}>Official Website</Link>
    </div>
    <div className='div7'>
    {(accountType === 'promoter' && (booking.status === 'confirmed' || booking.status === 'declined')) && (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'centre', alignItems: 'center'}}>
        <button style={{background: 'linear-gradient(to bottom, #22aa44, #e8ff59)', padding: '10px 10px', borderRadius: '5px', cursor: 'pointer', width: '180px'}} onClick={AcceptBooking}>Accept Booking</button>
        <button style={{background: 'linear-gradient(to bottom, #f70000, #f76b00)', padding: '10px 10px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', width: '180px'}} onClick={DeclineBooking}>Decline Booking</button>
        </div>
      )}
      {/* {(accountType === 'promoter' || (accountType === 'artist' && (booking.status === 'confirmed' || booking.status === 'declined'))) && (
        <h2>{booking.status}</h2>
      )} */}
    </div>
  </div>
 ); 
}

export default BookingItem;