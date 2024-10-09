import "@/app/globals.css";
import EventList from "@/app/ui/dashboard/eventList";
import mockEvents from "../../../mockData/events";

const events = mockEvents;

export default function FindGigs() {
  return (
    <>
      <div className="grid grid-cols-7 grid-rows-[h-24] ">
        <div className="col-start-2 row-start-1" >
          <input
            type="text"
            placeholder="Search..."
            className=" w-[630px] p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div >
        <div className="col-start-2 row-start-2">
          <EventList events={events}></EventList>
        </div>
      </div>
    </>
  );
}

