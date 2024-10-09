"use client";
import React, { useEffect, useState } from "react";
import SelectGenre from "./selectGenre";

export default function CreateEvent() {
  type EventData = {
    name: string;
    location: string;
    date: string;
    genre?: string[] | [];
    duration: number;
    maxCapacity: number;
    bannerURL?: string;
    link: string;
  };

  const initialState = {
    name: "",
    location: "",
    date: Date(),
    genre: [] as string[],
    duration: 0,
    maxCapacity: 0,
    bannerURL: "",
    link: "",
  };

  const [eventData, setEventData] = useState(initialState);
  const [genres, setGenres] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEventData({
      ...eventData,
      genre: genres,
    });
    setTimeout(() => {
      console.log("Evento creado:", eventData);
    }, 0);

    setTimeout(() => {
      setEventData(initialState);
    }, 100);
  };

  return (
    <div className="w-[650px] h-[450px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mt-10 rounded-[10px] p-6">
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
                className="mb-2 outline-none bg-[#20202a] border-b-[1px] border-white w-[500px]"
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
                className="mb-2 outline-none bg-[#20202a] border-b-[1px] border-white w-[500px]"
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
                className="mb-2 outline-none bg-[#20202a] border-b-[1px] border-white w-[500px]"
              />
            </div>
            <div>
              <label htmlFor="createEventFormDuration">
                Duration (minutes):
              </label>
              <input
                value={eventData.duration}
                name="duration"
                onChange={handleChange}
                type="number"
                step="10"
                id="createEventFormDuration"
                required
                className="mb-2 outline-none bg-[#20202a] border-b-[1px] border-white w-[500px]"
              />
            </div>
            <div>
              <label htmlFor="createEventFormCapacity">Max Capacity:</label>
              <input
                value={eventData.maxCapacity}
                name="maxCapacity"
                onChange={handleChange}
                type="number"
                step={10}
                id="createEventFormCapacity"
                required
                className="mb-2 outline-none bg-[#20202a] border-b-[1px] border-white w-[500px]"
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
                className="mb-2 outline-none bg-[#20202a] border-b-[1px] border-white w-[500px]"
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
                className="mb-2 outline-none bg-[#20202a] border-b-[1px] border-white w-[500px]"
              />
            </div>
            <SelectGenre setGenres={setGenres} genres={genres} />
          </div>
          <button className="w-[150px] h-12 mt-8 bg-blue-500 text-white rounded self-end mr-5 mb-5 ml-[30px]">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
