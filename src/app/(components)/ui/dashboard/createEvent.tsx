"use client";
import React, { useEffect, useState } from "react";
import SelectGenre from "./selectGenre";
import { Event } from "@/types/event";
import { string } from "zod";

export default function CreateEvent() {
  const initialState: Event = {
    name: "",
    location: "",
    date: new Date(),
    genre: [] as string[],
    duration: 1,
    maxCapacity: 100,
    bannerURL: undefined,
    link: undefined,
    promoterId: "asadb314aaf",
  };

  const [eventData, setEventData] = useState(initialState);
  const [genres, setGenres] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Helper function to handle special cases for specific fields
    const getProcessedValue = (name: string, value: string) => {
      // For fields that can be empty and should be treated as undefined
      const fieldsAllowingUndefined = ["bannerURL", "link"];
      if (fieldsAllowingUndefined.includes(name) && value.trim() === "") {
        return undefined; // Return undefined for empty strings in certain fields
      }
      return value; // Otherwise, return the actual value
    };

    setEventData((prevData) => ({
      ...prevData,
      [name]: getProcessedValue(name, value), // Process the value before updating the state
    }));
  };

  useEffect(() => {
    setEventData({
      ...eventData,
      genre: genres,
    });
    console.log( eventData)
  }, [genres]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: eventData.name,
        location: eventData.location,
        date: eventData.date,
        genre: eventData.genre,
        duration: eventData.duration,
        maxCapacity: parseInt(eventData.maxCapacity as string),
        bannerURL: eventData.bannerURL,
        link: eventData.link,
        promoterId: eventData.promoterId,
      }),
    });
    
    setEventData(initialState);

  };

  return (
    <div>
      <h2 className="text-xl mb-5 ">Create event</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="createEventFormLocation">Name:</label>
              <input
                value={eventData.name}
                name="name"
                onChange={handleChange}
                type="text"
                id="createEventFormName"
                required
                className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full"
              />
            </div>
            <div>
              <label htmlFor="createEventFormLocation">Location:</label>
              <input
                value={eventData.location}
                name="location"
                onChange={handleChange}
                type="text"
                id="createEventFormLocation"
                required
                className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full"
              />
            </div>
            <div>
              <label htmlFor="createEventFormName">Date:</label>
              <input
                value={eventData.date}
                name="date"
                onChange={handleChange}
                type="date"
                id="createEventFormName"
                required
                className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full]"
              />
            </div>
            <div>
              <label htmlFor="createEventFormDuration">Duration (days):</label>
              <input
                value={eventData.duration}
                name="duration"
                onChange={handleChange}
                type="number"
                min={1}
                step="1"
                id="createEventFormDuration"
                required
                className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full"
              />
            </div>
            <div>
              <label htmlFor="createEventFormCapacity">Max Capacity:</label>
              <input
                value={eventData.maxCapacity}
                name="maxCapacity"
                onChange={handleChange}
                min={1}
                type="number"
                id="createEventFormCapacity"
                className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full"
              />
            </div>
            <div>
              <label htmlFor="createEventFormBanner">Banner:</label>
              <input
                value={eventData.bannerURL}
                name="bannerURL"
                onChange={handleChange}
                type="text"
                id="createEventFormBanner"
                className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full"
              />
            </div>
            <div>
              <label htmlFor="createEventFormLink">Link:</label>
              <input
                value={eventData.link}
                name="link"
                onChange={handleChange}
                type="text"
                id="createEventFormLink"
                className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full"
              />
            </div>
            <div className="mt-4">
              <SelectGenre setGenres={setGenres} genres={genres} />
            </div>
          </div>
          <button className="w-[150px] h-12 mt-8 bg-blue-500 text-white rounded self-end mr-5 mb-5 ml-[30px]">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
