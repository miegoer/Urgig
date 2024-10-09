import { BookingZodSchema, SetZodSchema } from "./bookingZodSchema";

describe("BookingZodSchema validation", () => {
  const validBooking = {
    _id: "booking123",
    name: "Performance Booking",
    location: "New York",
    offer: 5000,
    sets: [
      {
        _id: "set1",
        date: new Date("2024-06-15"),
        setTimeStart: "18:00",
        setTimeEnd: "20:00",
      },
    ],
    expectedGenre: ["Rock", "Jazz"],
    maxCapacity: 500,
    status: "confirmed",
    bookingOrganizerId: "organizer123",
    bookingArtistId: "artist123",
  };

  const requiredFields = [
    "_id",
    "name",
    "location",
    "offer",
    "sets",
    "expectedGenre",
    "maxCapacity",
    "status",
    "bookingOrganizerId",
    "bookingArtistId",
  ];

  // Test for valid data
  it("should validate a correct booking object", () => {
    expect(() => BookingZodSchema.parse(validBooking)).not.toThrow(); // Should pass without throwing an error
  });

  requiredFields.forEach((field) => {
    it(`should throw an error if the ${field} field is missing`, () => {
      // Remove the field from the validBooking object
      const invalidBooking = { ...validBooking };
      delete invalidBooking[field];

      // Test the validation
      expect(() => BookingZodSchema.parse(invalidBooking)).toThrow(
        expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: [field], // Ensure the path contains the missing field
              message: "Required", // Zod returns "Required" for missing fields
            }),
          ]),
        })
      );
    });
  });

  // Test for invalid data (missing required fields)
  it("should throw an error if required field 'name' is missing", () => {
    const invalidBooking = {
      _id: "booking123",
      location: "New York", // 'name' is missing
      offer: 5000,
      sets: [
        {
          _id: "set1",
          date: new Date("2024-06-15"),
          setTimeStart: "18:00",
          setTimeEnd: "20:00",
        },
      ],
      expectedGenre: ["Rock", "Jazz"],
      maxCapacity: 500,
      status: "confirmed",
      bookingOrganizerId: "organizer123",
      bookingArtistId: "artist123",
    };

    expect(() => BookingZodSchema.parse(invalidBooking)).toThrow(); // Should throw a validation error
  });

  // Test for invalid URL in optional fields
  it("should throw an error for an invalid URL in bannerURL", () => {
    const invalidBooking = {
      _id: "booking123",
      name: "Performance Booking",
      location: "New York",
      offer: 5000,
      sets: [
        {
          _id: "set1",
          date: new Date("2024-06-15"),
          setTimeStart: "18:00",
          setTimeEnd: "20:00",
        },
      ],
      expectedGenre: ["Rock", "Jazz"],
      maxCapacity: 500,
      status: "confirmed",
      bookingOrganizerId: "organizer123",
      bookingArtistId: "artist123",
      bannerURL: "invalid-url", // Invalid URL
    };

    expect(() => BookingZodSchema.parse(invalidBooking)).toThrow(); // Should throw a validation error for the invalid URL
  });
});

describe("SetZodSchema validation", () => {
  // Test for valid Set
  it("should validate a correct set object", () => {
    const validSet = {
      _id: "set1",
      date: new Date("2024-06-15"),
      setTimeStart: "18:00",
      setTimeEnd: "20:00",
    };

    expect(() => SetZodSchema.parse(validSet)).not.toThrow(); // Should pass without throwing an error
  });

  // Test for missing required field
  it("should throw an error if required fields are missing in Set", () => {
    const invalidSet = {
      _id: "set1",
      setTimeStart: "18:00", // 'date' and 'setTimeEnd' are missing
    };

    expect(() => SetZodSchema.parse(invalidSet)).toThrow(); // Should throw a validation error
  });
});
