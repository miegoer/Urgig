import { Event } from "@/types/event";
import { ArtistEvent } from "@/types/interfaces.ts/artistEvent";

// Function to fetch events from the backend
export const fetchAndTransformEvents = async (artistId: string | undefined) => {
  // if (!artistId) {
  //   console.log("userID not loaded yet...");
  //   return [];
  // }
  artistId = "67082cc74e2febe010324134";

  try {
    const response = await fetch(`/api/users/${artistId}/pastEvents`); // Adjust the API route if necessary
    const events: Event[] = await response.json();
    console.log(events);

    // Transform the fetched events into the ArtistUpcomingEvent format
    return events.map((event) => ({
      _id: event._id,
      name: event.name,
      dateD: new Date(event.date).getDate().toString(), // Get the day of the month
      dateM: new Date(event.date).toLocaleString("default", { month: "short" }), // Get the abbreviated month name
      time: "", // Placeholder for time (yet to be settled)
    }));
  } catch (error) {
    console.error("Error fetching or transforming events:", error);
    throw error;
  }
};
