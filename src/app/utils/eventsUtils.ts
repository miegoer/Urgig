import { Event } from "@/types/event";
import { ArtistEvent } from "@/types/interfaces.ts/artistEvent";

// Function to fetch events from the backend
export const fetchAndTransformEvents = async (
  artistId: string | undefined
): Promise<[ArtistEvent[], ArtistEvent[]]> => {
  // if (!artistId) {
  //   console.log("userID not loaded yet...");
  //   return [];
  // }
  //if mocking:

  // artistId = "67082cc74e2febe010324134";

  try {
    const response = await fetch(`/api/users/${artistId}/events`); // Adjust the API route if necessary
    const events: Event[] = await response.json();
    console.log(events)

    const upcomingEvents: Event[] = [];
    const pastEvents: Event[] = [];
    events.forEach((event) =>
      new Date(event.date).getTime() > Date.now()
        ? upcomingEvents.push(event)
        : pastEvents.push(event)
    );

    // Transform the fetched events into the ArtistUpcomingEvent format
    return [sortAndTransformEvents(upcomingEvents, 1), sortAndTransformEvents(pastEvents, -1)];
  } catch (error) {
    console.error("Error fetching or transforming events:", error);
    throw error;
  }
};

const sortAndTransformEvents = (events: Event[], prefix: number): ArtistEvent[] => {
  return events
    .sort((a, b) => new Date(a.date).getTime() - prefix * new Date(b.date).getTime())
    .map((event) => ({
      _id: event._id!,
      name: event.name,
      location: event.location,
      dateD: new Date(event.date).getDate().toString(), // Get the day of the month
      dateM: new Date(event.date).toLocaleString("default", { month: "short" }), // Get the abbreviated month name
      time: "", // Placeholder for time (yet to be settled)
    }));
};
