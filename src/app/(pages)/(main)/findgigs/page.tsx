"use client";
// import "@/app/globals.css";
import EventList from "../../../(components)/ui/eventList";
import mockEvents from "../../../../mockData/events";
import { Event } from "@/types/event";
import { useEffect, useState } from "react";

let events: Event[] = mockEvents; //mock to be deleted

export default function FindGigs() {
  const [search, setSearch] = useState<string>("");
  const [filteredSearch, setFilteredSearch] = useState<Event[]>(events);




  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (search.length >= 3) {
      const filteredResults: Event[] = events.filter((event: Event) =>
        event.name.toLowerCase().includes(search.trim().toLowerCase())
      );
      setFilteredSearch(filteredResults);
      console.log(filteredResults);
    } else {
      setFilteredSearch(events);
    }
    setSearch('')
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="search"
            type="text"
            placeholder="Search..."
            className="text-black w-[full] p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
      <div>
        { filteredSearch.length > 0 ? (
          <EventList events={filteredSearch} />
        ) : (
          <div>
            <p>No events found for "{search}"</p>
            <EventList events={events} />
          </div>
        )}
      </div>
    </>
  );
}

// const filterEvents = () => {
//   if (search.length >= 3) {
//     const filteredResults: Event[] = events.filter((event: Event) =>
//       event.name.toLowerCase().includes(search.trim().toLowerCase())
//     );
//     setFilteredSearch(filteredResults)
//   }else {
//     setFilteredSearch(events)
//   }
// };

// useEffect(()=> filterEvents(),[search])

// const handleSubmit = (e:React.FormEvent) => {
//   e.preventDefault();
//   filterEvents()

{
  /* <div>
        {filteredSearch.length > 0 ? (
          <EventList events={filteredSearch} />
        ) : (
          <p>No events found for "{search}"</p>
        )}
      </div> */
}
