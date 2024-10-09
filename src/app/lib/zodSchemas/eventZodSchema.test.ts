import { EventZodSchema } from "./eventZodSchema";

describe("EventZodSchema validation - missing required fields", () => {
  const validEvent = {
    _id: "event123",
    name: "Music Festival",
    organiserId: "organizer456",
    date: "1990-01-01", // Using string format here
    bannerURL: "https://example.com/banner.jpg",
    location: "New York",
    genre: ["Rock", "Pop"],
    duration: 3,
    maxCapacity: 10000,
    link: "https://example.com",
  };

  const requiredFields = [
    "_id",
    "name",
    "organiserId",
    "location",
    "genre",
    "duration",
    "maxCapacity",
  ];

  requiredFields.forEach((field) => {
    it(`should throw an error if the ${field} field is missing`, () => {
      // Remove the field from the validEvent object
      const invalidEvent = { ...validEvent };
      delete invalidEvent[field];

      // Test the validation
      expect(() => EventZodSchema.parse(invalidEvent)).toThrow(
        expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: [field],
              message: "Required", // Zod's default message for missing fields
            }),
          ]),
        })
      );
    });
  });

  it("should throw an error for an invalid URL in bannerURL", () => {
    const invalidEvent = { ...validEvent, bannerURL: "invalid-url" };

    expect(() => EventZodSchema.parse(invalidEvent)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            path: ["bannerURL"],
            message: "Invalid url", // Zod's default message for invalid URL
          }),
        ]),
      })
    );
  });

  it("should throw an error for an invalid date format in date", () => {
    const invalidEvent = { ...validEvent, date: "invalid-date" };

    expect(() => EventZodSchema.parse(invalidEvent)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            path: ["date"],
            message: "Invalid date format", // Custom message for invalid date
          }),
        ]),
      })
    );
  });

  it("should validate a correct event object", () => {
    expect(() => EventZodSchema.parse(validEvent)).not.toThrow(); // Should pass without throwing an error
  });
});
