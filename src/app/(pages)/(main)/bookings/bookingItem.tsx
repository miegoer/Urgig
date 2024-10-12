import { Booking } from "@/types/booking";
import Link from "next/link";

const BookingItem: React.FC<{booking: Booking}> = ({booking}) => {
  const accountType = 'artist';
 return (
  <div className="shadow-[0px_4px_5px_#191922] h-[200px] rounded-[20px] bg-[#252531] mb-[20px] p-3" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <h1>{booking.name}</h1>
      <Link href={new URL(booking.link!)}>{booking.link}</Link>
      <Link href={`/profile/${booking.bookingPromoterId}`}>promoter account</Link>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <h2>{booking.location}</h2>
      {booking.sets.map((set) => (
        <div key={set._id}>
          <h3>{new Date(set.date).toDateString()}</h3>
          <p>{set.setTimeStart} - {set.setTimeEnd}</p>
        </div>
      ))}
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <h2>Max Capacity: {booking.maxCapacity}</h2>
      <div>
      {booking.expectedGenre.map((genre) => (
        <h3 key={genre}>{genre}</h3>
      ))}
      </div>
      <h2>Offer: ${booking.offer}</h2>
    </div>
    {accountType === 'artist' && (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
      <button style={{background: 'linear-gradient(to bottom, #22aa44, #e8ff59)', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer'}}>Accept Booking</button>
      <button style={{background: 'linear-gradient(to bottom, #f70000, #f76b00)', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer'}}>Decline Booking</button>
      </div>
    )}
    {accountType === 'promoter' && (
      <h2>{booking.status}</h2>
    )}
  </div>
 ); 
}

export default BookingItem;