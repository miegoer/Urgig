import { Event } from "@/types/event";
import EventElement from "./dashboard/eventElement";
import Link from "next/link";
type eventListProps = {
  events: Event[]
} 

export default function EventList({events}:eventListProps) {
  return (
    <div >
      {events.map((event:Event) => (
        <div
          key={event._id}
          className="w-[700px] h-[300px] flex justify-between shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mt-10 rounded-[10px]"
        >
          <EventElement {...event} />
          <div className="self-end">
          <button className="w-[150px] h-12 bg-blue-500 text-white rounded self-end mr-5 mb-5">
            Apply to this Gig
          </button>
          <Link href={`event/${event._id}`} passHref>
          <button className="w-[150px] h-12 bg-blue-500 text-white rounded self-end mr-5 mb-5">
            View the event
          </button></Link>
          </div>
        </div>
      ))}
    </div>
  );
}
