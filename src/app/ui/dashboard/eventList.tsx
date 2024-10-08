import {Event} from "../../../types/event";
import EventElement from "./event";

type EventListProps = {
  events: Event[];
};

export default function EventList({ events }: EventListProps) {
  return (
    <div>
      {events.map((event) => (
        <div
          key={event._id}
          className="w-[400px] h-[300px] flex flex-col shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mt-[35px] mb-[15px] mx-[25px] m-5 rounded-[5%]"
        >
          <EventElement {...event} />
          <button className="w-36 h-12 bg-blue-500 text-white rounded self-end mr-5">
            Apply to this Gig
          </button>
        </div>
      ))}
    </div>
  );
}
