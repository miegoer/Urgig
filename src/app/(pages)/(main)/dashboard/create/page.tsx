"use client";
import React, { useEffect, useState } from "react";
import { Event } from "@/types/event";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import SelectGenre from "@/app/(components)/ui/dashboard/selectGenre";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
  const { userId } = useTalkSession();
  const router = useRouter();
  // const _id = userId? userId.slice(5): '';

  const initialState: Event = {
    _id:"",
    name: "",
    location: "",
    date: new Date(),
    genre: [] as string[],
    duration: 1,
    maxCapacity: 100,
    bannerURL: undefined,
    link: undefined,
    promoterId: "",
  };

  const [eventData, setEventData] = useState(initialState);
  const [genres, setGenres] = useState<string[]>([]);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);

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
      promoterId: userId as string,
    });
  }, [genres]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSent(!isSent);
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
        duration: Number(eventData.duration),
        maxCapacity: parseInt(eventData.maxCapacity as string),
        bannerURL: eventData.bannerURL,
        link: eventData.link,
        promoterId: eventData.promoterId,
      }),
    }).then((response) => {
      if (response.ok) {
        setEventData(initialState);
        setGenres([]);
        setIsCreated(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
        // window.location.reload(); //NEXT::::navigate to the event page
      } else if (!response.ok) {
        setIsWrong(!isWrong);
        console.log(
          "Unsucceded post request.Status Text:",
          response.statusText,
          response.status
        );
      }
    });
  };

  return (
    <div className="w-[58%] flex flex-col justify-center shadow-[0px_0px_0px_#272525] mx-[30px] my-0 pt-2.5 pb-[35px] px-2.5 rounded-[20px] bg-[#252531]">
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
                value={eventData.date as any}
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
                type="url"
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
                type="url"
                id="createEventFormLink"
                className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full"
              />
            </div>
            <div className="mt-4">
              <SelectGenre
                setGenres={setGenres}
                genres={genres}
                isSent={isSent}
              />
            </div>
          </div>
          {isWrong && <p>Something went wrong, try again</p>}
          {isSent && <p>Your new event was created succesfully!!</p>}
          {/* <Link href={'/dashboard'}>   */}
          <button className="w-[150px] h-12 mt-8 bg-blue-500 text-white rounded self-end mr-5 mb-5 ml-[30px]">
            Create Event
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
}
