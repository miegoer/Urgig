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
    _id:"",
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
    <div className="w-[58%] flex flex-col justify-center shadow-[0px_0px_0px_#272525] mx-[30px] my-0 pt-2.5 pb-[35px] px-2.5 rounded-[20px] bg-[#252531]">
      <h2 className="text-xl mb-5">Create Event</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            {/* Name */}
            <div>
              <label htmlFor="createEventFormName">Name:</label>
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
            {/* Location */}
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
            {/* Date */}
            <div>
              <label htmlFor="createEventFormDate">Date:</label>
              <input
                value={eventData.date as any}
                name="date"
                onChange={handleChange}
                type="date"
                id="createEventFormDate"
                required
                className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full"
              />
            </div>
            {/* Image Upload */}
            <div>
              <label>Event Image:</label>
              <EventImageUpload setImageURL={setImageURL} /> {/* Handle image upload */}
            </div>
            {/* Genres */}
            <div className="mt-4">
              <SelectGenre setGenres={setGenres} genres={genres} isSent={isSent} />
            </div>
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
