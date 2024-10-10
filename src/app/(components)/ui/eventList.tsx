import events from "@/mockData/events";
import Event from "./dashboard/event";

export default function EventList({events}) {
  return (
    <div >
      {events.map((event) => (
        <div
          key={event._id}
          className="w-[630px] h-[230px] flex justify-between shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mt-10 rounded-[10px]"
        >
          <Event {...event} />
          <button className="w-[150px] h-12 bg-blue-500 text-white rounded self-end mr-5 mb-5">
            Apply to this Gig
          </button>
        </div>
      ))}
    </div>
  );
}
