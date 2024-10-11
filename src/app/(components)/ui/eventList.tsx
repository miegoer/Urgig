import events from "@/mockData/events";
import Event from "./dashboard/event";

export default function EventList({ events }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {events.map((event) => (
        <div
          key={event._id}
          className="flex justify-between w-full max-w-[700px] shadow-[0px_4px_5px_#191922] rounded-[20px] bg-[#252531] p-4"
        >
          <Event {...event} />
          <button className="w-[140px] h-10 bg-[#ccff69] text-[#252531] rounded-md shadow-sm hover:bg-[#aaff50] transition duration-300 self-center">
            Apply to this Gig
          </button>
        </div>
      ))}
    </div>
  );
}
