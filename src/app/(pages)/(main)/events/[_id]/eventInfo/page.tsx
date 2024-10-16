"use client";
import { useParams } from "next/navigation";
import { useEffect, useState , Suspense} from "react";
import { Event } from "@/types/event";


export default function eventInfo() {
  const params = useParams();
  const [event, setEvent] = useState<Event>({
    name: "",
    location: "",
    date: new Date(),
    genre: [] as string[],
    duration: 1,
    maxCapacity: 100,
    link: undefined,
    promoterId: "",
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/events/${params._id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params]);

  return (
 

    <div className="flex flex-col justify-center  w-[600px] ml-[30px]">
      <div
        className={`z-10 w-[100%] mt-8 p-5 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
      >
        Event Information
      </div>

      <div className="flex flex-col justify-center ml-[78px] w-[450px] ">
        <div className="border-t w-[300px] h-0 self-center"></div>

        <div className="mt-3 text-xs text-[#a0aec0] space-y-1 text-center">
          <p>Location: {event.location}</p>
          <p>Days: {event.duration}</p>
          <p>Date: {new Date(event.date).toLocaleDateString('en-US')}</p>
        </div>

        <div className="border-t w-[300px] h-0 self-center mt-4"></div>

      <div
        className={`z-10 w-[100%] mt-4 rounded-[2px] text-center tracking-[1.5px] text-[white] text-sm`}
      >
        Artists:

        <div className="mt-3 text-xs text-[#a0aec0] space-y-1 text-center">
          <p>PLACEHOLDER</p>
          <p>PLACEHOLDER</p>
          <p>PLACEHOLDER</p>
        </div>

      </div>
      </div>
    </div>
   
  );
}
