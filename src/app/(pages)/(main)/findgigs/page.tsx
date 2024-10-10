"use client";
// import "@/app/globals.css";
import EventList from "../../../(components)/ui/eventList";
import { Event } from "@/types/event";
import { useEffect, useState } from "react";

export default function FindGigs() {
  const [search, setSearch] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredSearch, setFilteredSearch] = useState<Event[]>([]);
  const [searchFlag, setSearchFlag] = useState<boolean>(false);
  const [lastSearch, setLastSearch] = useState<string>('')

  useEffect(() => {
    const fetchData = async (): Promise<Event[] | void> => {
      fetch("/api/events")
        .then((res) => res.json())
        .then((res) => {
          setEvents(res);
        })
        .catch((error) => console.log(error));
    }
    fetchData();
  }, []);


  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setSearchFlag(true);
    setLastSearch(search);
    if (search.length >= 3) {
      const filteredResults: Event[] = events.filter((event: Event) =>
        event.name.toLowerCase().includes(search.trim().toLowerCase())
      );
      setFilteredSearch(filteredResults);
    } else {
      setFilteredSearch([]);
    }
    setSearch("");
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
        {searchFlag && filteredSearch.length === 0 && lastSearch.length >= 3 ? (  
          <p>No events found for "{lastSearch}"</p>
        ) : (
          <EventList events={filteredSearch.length > 0 ? filteredSearch : events} /> 
        )}
      </div>
    </>
  );
}
