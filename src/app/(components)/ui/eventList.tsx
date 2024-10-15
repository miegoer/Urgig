import EventElement from "./dashboard/eventElement";
import { Event } from "../../../types/event";
import Link from 'next/link';


type eventListProps = {
  events: Event[];
};

export default function EventList({ events }: eventListProps) {
  return (
    <div className="flex flex-col items-center ">
      {events.map((event) => (
        <div
          key={event._id}
          className="w-[630px] h-[200px] bg-[#1e1e26] flex justify-between shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mt-6 rounded-[10px] p-6"
        >
          <EventElement event={event} />
          <div className="self-end">
            <button className="w-[120px] h-10 bg-[#ccff69] text-[#252531] mr-2 rounded-md shadow-sm hover:bg-[#aaff50] transition duration-300 self-center">
              Apply for Gigs
            </button>
            <Link href={`event/${event._id}`}>
            <button className="w-[120px] h-10 bg-blue-500 text-[#252531] rounded-md shadow-sm hover:bg-[#507fff] transition duration-300 self-center">
              View the Event
            </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

