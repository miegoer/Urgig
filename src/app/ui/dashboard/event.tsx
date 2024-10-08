import type {Event} from "../../../types/event";

export default function Event(event:Event) {
  return (
    <div>
      <h3>{event.name}</h3>
      <p>{event.date.toLocaleDateString()}</p>
      <p>{event.location}</p>
      <p>{event.genre}</p>
      <p>{event.duration}</p>
      <p>{event.maxCapacity}</p>
      <p>{event.link}</p>
      
    </div>
  )
}

