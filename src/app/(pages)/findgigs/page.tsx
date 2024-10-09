import "@/app/globals.css";
import EventList from "@/app/ui/dashboard/eventList";
import mockEvents from "../../../mockData/events";

type EventListProps = {
  events: Event[];
};

const events: EventListProps = mockEvents;

export default function FindGigs() {
  return (
    <>
      <div >
        
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div >
        <EventList events={events}></EventList>
      </div>
    </>
  );
}

