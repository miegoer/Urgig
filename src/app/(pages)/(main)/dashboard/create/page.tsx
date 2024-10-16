"use client";
import ImageUpload from "../../../../(components)/ui/dashboard/ImageUpload";
import React, { useEffect, useState } from "react";
import { Event } from "@/types/event";
import { useTalkSession } from "@/app/(context)/TalkSessionContext";
import SelectGenre from "@/app/(components)/ui/dashboard/selectGenre";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
  const { userId } = useTalkSession();
  const router = useRouter();

  const initialState: Event = {
    name: "",
    location: "",
    date: new Date(),
    genre: [] as string[],
    description: "",
    duration: 1,
    maxCapacity: 100,
    imageURL: undefined,
    promoterId: "",
  };

  const [eventData, setEventData] = useState<Event>(initialState);
  const [genres, setGenres] = useState<string[]>([]);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [step, setStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      imageURL: imageURL || undefined,
    }));
  }, [genres, userId, imageURL]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSent(!isSent);

    // Ensure the link starts with "https://"
    let formattedLink = eventData.link;
    if (formattedLink && !formattedLink.startsWith("https://")) {
      formattedLink = `https://${formattedLink}`;
      setEventData((prevData) => ({
        ...prevData,
        link: formattedLink,
      }));
    }

    // Redirects to the created event when ''finish'' is pressed
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...eventData,
          duration: Number(eventData.duration),
          maxCapacity: Number(eventData.maxCapacity),
          imageURL: eventData.imageURL,
          link: formattedLink, // Use the formatted link
        }),
      });

      if (response.ok) {
        const createdEvent = await response.json();
        const newEventId = createdEvent._id;

        setEventData(initialState);
        setGenres([]);
        setImageURL(undefined);
        setIsCreated(true);

        setTimeout(() => {
          router.push(`/events/${newEventId}`);
        }, 50);
      } else {
        setIsWrong(true);
      }
    } catch (error) {
      setIsWrong(true);
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) setStep(step + 1);
    else setIsWrong(true);
  };

  const prevStep = () => {
    setIsWrong(false);
    setStep(step - 1);
  };

  const validateCurrentStep = () => {
    setIsWrong(false);

    switch (step) {
      case 1:
        return eventData.name !== "";
      case 2:
        return eventData.location !== "";
      case 3:
        return eventData.date !== null;
      case 4:
        return eventData.link !== "";
      case 5:
        return genres.length > 0;
      case 6:
        return eventData.description !== "";
      case 7:
        return imageURL !== undefined && imageURL !== "";
      default:
        return true;
    }
  };

  // Goes to the next step when pressing 'enter'
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextStep();
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[58%] flex flex-col justify-center shadow-[0px_0px_0px_#272525] mx-[30px] my-0 pt-2.5 pb-[35px] px-2.5 rounded-[20px] bg-[#252531]">
        <h2 className="text-xl mb-5 text-center">Create Event</h2>
        <div>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Name */}
            {step === 1 && (
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
                  onKeyDown={handleKeyDown}
                />
                {isWrong && <p className="text-red-500">Please enter a valid name</p>}
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
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
                  onKeyDown={handleKeyDown}
                />
                {isWrong && <p className="text-red-500">Please enter a valid location</p>}
              </div>
            )}

            {/* Step 3: Date */}
            {step === 3 && (
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
                  onKeyDown={handleKeyDown}
                />
                {isWrong && <p className="text-red-500">Please enter a valid date</p>}
              </div>
            )}

            {/* Step 4: Link */}
            {step === 4 && (
              <div>
                <label htmlFor="createEventFormLink">Link:</label>
                <input
                  value={eventData.link}
                  name="link"
                  onChange={handleChange}
                  type="text"
                  id="createEventFormLink"
                  required
                  className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full"
                  onKeyDown={handleKeyDown}
                />
                {isWrong && <p className="text-red-500">Please enter a valid link</p>}
              </div>
            )}

            {/* Step 5: Genres */}
            {step === 5 && (
              <div className="mt-4">
                <SelectGenre setGenres={setGenres} genres={genres} isSent={isSent} />
                {isWrong && <p className="text-red-500">Please select at least one genre</p>}
              </div>
            )}

            {/* Step 6: Description */}
            {step === 6 && (
              <div>
                <label htmlFor="createEventFormDescription">Description:</label>
                <textarea
                  value={eventData.description}
                  name="description"
                  onChange={handleChange}
                  id="createEventFormDescription"
                  required
                  className="mb-2 outline-none bg-[#252531] border-b-[1px] border-white w-full"
                  onKeyDown={handleKeyDown}
                />
                {isWrong && (
                  <p className="text-red-500">Please enter a valid description</p>
                )}
              </div>
            )}

            {/* Step 7: Event Image */}
            {step === 7 && (
              <div>
                <label>Event Image:</label>
                <ImageUpload setImageURL={setImageURL} />
                {isWrong && <p className="text-red-500">Please upload a valid image</p>}
              </div>
            )}

            {isCreated && (
              <p className="text-green-500">
                Your new event was created successfully!
              </p>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  className="submit"
                  onClick={prevStep}
                >
                  Back
                </button>
              )}

              {step < 7 && (
                <button
                  type="button"
                  className="submit"
                  onClick={nextStep}
                >
                  Next
                </button>
              )}

              {step === 7 && (
                <button
                  type="submit"
                  className="submit"
                >
                  Finish
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
