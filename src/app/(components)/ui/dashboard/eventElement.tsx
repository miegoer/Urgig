import { Event } from "@/types/event";
import Image from 'next/image';

type EventElementProps = {
  event: Event;
};

const EventElement = ({ event }: EventElementProps) => {
  const {
    name,
    date,
    location,
    genre,
    duration,
    maxCapacity,
    link,
    imageURL,
  } = event;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex">
      {imageURL && (
        <div className="mr-4">
          <Image
            src={imageURL}
            alt={name}
            width={120}
            height={120}
            className="object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex flex-col justify-around pr-4 ">
        <div className="mb-2">
          <span className="text-lg tracking-wide text-[#e0e7ff] uppercase">
            {name}
          </span>
        </div>
        <div className="text-xs text-[#a0aec0] space-y-1">
          <div>Date: {formattedDate}</div>
          <div>Location: {location}</div>
          <div>Genre: {genre}</div>
          <div>Duration: {duration} day(s)</div>
          <div>Max Capacity: {maxCapacity}</div>
          <a href={link} className="text-[#7c3aed] underline mt-2">
            {link}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventElement;
