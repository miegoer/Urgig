import { Booking } from "@/types/booking";

// Fetch bookings from the back-end
export const fetchBookings = async (
    artistId: string | undefined
  ): Promise<Booking[]> => {
    try {
      const response = await fetch(`/api/bookings?userId=${artistId}`);
      const bookings: Booking[] = await response.json();
      return bookings;
    } catch (error) {
      console.error("Error fetching bookings", error);
      throw error;
    }
  };