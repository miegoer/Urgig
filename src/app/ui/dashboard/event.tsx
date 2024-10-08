import type { Event } from "../../../types/event";

export default function Event(event: Event) {
  return (
    <div className="m-5 rounded-[5%]">
      <h2 className="text-xl">{event.name}</h2>
      <p>
        <strong>Date:</strong> {event.date.toLocaleDateString()}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Genre:</strong> {event.genre}
      </p>
      <p>
        <strong>Duration:</strong> {event.duration}
      </p>
      <p>
        <strong>Max Capacity:</strong> {event.maxCapacity}
      </p>
      <p>
        <strong>Link:</strong>{" "}
        <a href={event.link} className="text-blue-500 hover:underline">
          {event.link}
        </a>
      </p>
    </div>
  );
}
