"use client";
import EventImageUpload from "../../../../(components)/ui/dashboard/EventImageUpload";
import React, { useEffect, useState } from "react";
import { Event } from "@/types/event";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import SelectGenre from "@/app/(components)/ui/dashboard/selectGenre";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageUpload from "../../../../(components)/ui/dashboard/ImageUpload";

export default function CreateEvent() {
  const { userId } = useTalkSession();
  const router = useRouter();

  const initialState: Event = {
    name: "",
    location: "",
    date: new Date(),
    genre: [] as string[],
    duration: 1,
    maxCapacity: 100,
    imageURL: "",
    link: undefined,
    promoterId: "",
  };

  const [eventData, setEventData] = useState(initialState);
  const [genres, setGenres] = useState<string[]>([]);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setEventData((prevData) => ({
      ...prevData,
      genre: genres,
      promoterId: userId as string,
      imageURL: imageURL, // Update eventData with imageURL
    }));
  }, [genres, userId, imageURL]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSent(!isSent);

    try {
      const response = await fetch("/api/events", {
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
          maxCapacity: Number(eventData.maxCapacity),
          imageURL: eventData.imageURL, // Send imageURL to backend
          link: eventData.link,
          promoterId: eventData.promoterId,
        }),
      });

      if (response.ok) {
        setEventData(initialState);
        setGenres([]);
        setImageURL("");
        setIsCreated(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        setIsWrong(true);
        console.error("Unsuccessful post request. Status:", response.statusText);
      }
    } catch (error) {
      setIsWrong(true);
      console.error("Error submitting event:", error);
    }
  };

  return (
    <div 
    className="w-[65%] h-[600px] flex flex-col shadow-[0px_0px_0px_#272525] mx-[30px] my-2 pt-2.5 pb-[5px] px-2.5 rounded-[20px] bg-[#292346]">
      <h2 className="text-xl m-5 text-center text-[#ccff69]">Create New Event</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="createEventFormLocation" className="block text-[12px] tracking-[1px] uppercase my-[7px] text-[#ccff69]">Name:</label>
                <input
                  value={eventData.name}
                  name="name"
                  onChange={handleChange}
                  type="text"
                  id="createEventFormName"
                  required
                  className="text-center w-[300px] p-1 mb-2 outline-none rounded-[20px] text-[black] border-b-[1px] border-white"
                />
          </div>
          <div className="flex flex-row justify-around items-center border-b">
            <div className="flex flex-col items-center">
            <label htmlFor="createEventFormName" className="block text-[12px] tracking-[1px] uppercase my-[8px] text-[#ccff69]">Date:</label>
              <input
                value={eventData.date as any}
                name="date"
                onChange={handleChange}
                type="date"
                id="createEventFormName"
                required
                className="text-center w-[150px] p-1 mb-5 outline-none rounded-[20px] text-[black]"
              />
            </div>
            <div className="flex flex-col items-center">
            <label htmlFor="createEventFormDuration" className="block text-[12px] tracking-[1px] uppercase my-[8px] text-[#ccff69]">No. of Days:</label>
              <input
                value={eventData.duration}
                name="duration"
                onChange={handleChange}
                type="number"
                min={1}
                step="1"
                id="createEventFormDuration"
                required
                className="text-center w-[90px] p-1 mb-5 outline-none rounded-[20px] text-[black]"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="createEventFormLocation" className="block text-[12px] tracking-[1px] uppercase my-[8px] text-[#ccff69]">Location:</label>
              <input
                value={eventData.location}
                name="location"
                onChange={handleChange}
                type="text"
                id="createEventFormLocation"
                required
                className="text-center w-[240px] p-1 mb-5 outline-none rounded-[20px] text-[black]"
              />
            </div>
            {/* Image Upload */}
            <div>
              <label>Event Image:</label>
              <EventImageUpload setImageURL={setImageURL} /> {/* Handle image upload */}
          </div>
          <div className="flex flex-row justify-center items-center mb-[30px]">
          <div className="flex flex-col justify-center mt-[15px] items-center mr-[30px]">
              <label htmlFor="createEventFormCapacity" className="block text-[12px] tracking-[1px] uppercase my-[7px] mr-[12px] text-[#ccff69]">Max Capacity:</label>
              <input
                value={eventData.maxCapacity}
                name="maxCapacity"
                onChange={handleChange}
                min={1}
                type="number"
                id="createEventFormCapacity"
                className="text-center w-[180px] p-1 outline-none rounded-[20px] text-[black]"
              />
            </div>
            <div className="flex flex-col justify-center mt-[15px] items-center">
              <label htmlFor="createEventFormBanner" className="block text-[12px] tracking-[1px] uppercase my-[7px] mr-[12px] text-[#ccff69]">Banner:</label>
              <input
                value={eventData.bannerURL}
                name="bannerURL"
                onChange={handleChange}
                type="url"
                id="createEventFormBanner"
                className="text-center w-[180px] p-1 outline-none rounded-[20px] text-[black]"
              />
            </div>
          </div>
            <div className="flex flex-row justify-center mt-[30px] items-center">
              <label htmlFor="createEventFormLink" className="block text-[12px] tracking-[1px] uppercase my-[7px] mr-[12px] text-[#ccff69]">Link:</label>
              <input
                value={eventData.link}
                name="link"
                onChange={handleChange}
                type="url"
                id="createEventFormLink"
                className="text-center w-[280px] p-1 outline-none rounded-[20px] text-[black]"
              />
            </div>
            <div className="mt-4">
              <SelectGenre setGenres={setGenres} genres={genres} isSent={isSent} />
            </div>
          {isWrong && <p className="text-red-500">Something went wrong, try again</p>}
          {isCreated && <p className="text-green-500">Your new event was created successfully!</p>}
          <button className="w-[150px] h-12 mt-8 bg-blue-500 text-white rounded self-end mr-5 mb-5 ml-[30px] hover:bg-blue-600 transition">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
