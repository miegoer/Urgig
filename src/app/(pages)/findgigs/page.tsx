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

{
  /* <!-- Elementos centrados y más largos -->
  <div className="grid grid-cols-1 gap-6 w-full max-w-4xl px-4">
    <div className="bg-white p-6 shadow-lg rounded-lg flex justify-center items-center">
      <p>Element 1</p>
    </div>
    <div className="bg-white p-6 shadow-lg rounded-lg flex justify-center items-center">
      <p>Element 2</p>
    </div>
    <div className="bg-white p-6 shadow-lg rounded-lg flex justify-center items-center">
      <p>Element 3</p>
    </div>
</div> */
}
