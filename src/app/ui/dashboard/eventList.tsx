import events from "../../../mockData/events";
import Event from "./event";

export default function EventList() {
  return (
    <div>
      {events.map((event) => (
        <div key={event._id}>
          <Event {...event} />
          <button >Apply to this Gig</button>
        </div>
      ))}
    </div>
  );
}