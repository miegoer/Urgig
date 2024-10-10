import "@/app/(pages)/globals.css";
import EventList from "../../../(components)/ui/eventList";
import mockEvents from "../../../../mockData/events";
import { Event } from "@/types/event";

const events: Event[] = mockEvents;

export default function FindGigs() {
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <EventList events={events}></EventList>
      </div>
    </>
  );
}
