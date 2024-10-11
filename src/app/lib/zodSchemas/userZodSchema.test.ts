//TODO! need to add tests for stageName, companyName,

import {
  UserZodSchema,
  ProfileDetailsZodSchema,
  SettingsZodSchema,
  StatisticsZodSchema,
} from "@/app/lib/zodSchemas/userZodSchema"; // Adjust if necessary

describe("UserZodSchema validation", () => {
  const validUser = {
    _id: "user123",
    email: "user@example.com",
    typeOfAccount: "standard",
    name: "John Doe",
    contactNumber: "1234567890",
    password: "securepassword",
    dateOfBirth: "1990-01-01",
    location: "New York",
    settings: {
      // Add any required settings fields here
    },
    profileDetails: {
      profilePicture: "https://example.com/profile.jpg",
      aboutMe: "Hello, I'm John!",
      selectedVideo: "https://youtube.com/video",
      socialLinks: {
        twitter: "https://twitter.com/johndoe",
        facebook: "https://facebook.com/johndoe",
      },
    },
    statistics: {
      profileViews: 100,
      offersGot: 50,
      offersAcccepted: 20,
      income: 5000,
      avgCapacity: 300,
      totalAtendees: 1000,
      totalEvents: 10,
    },
    events: ["event1", "event2"],
  };

  const requiredFields: (keyof typeof validUser)[] = ["_id", "email", "typeOfAccount"];

  requiredFields.forEach((field) => {
    it(`should throw an error if the ${field} field is missing`, () => {
      const invalidUser = { ...validUser };
      delete invalidUser[field];

      expect(() => UserZodSchema.parse(invalidUser)).toThrow(
        expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: [field],
              message: "Required",
            }),
          ]),
        })
      );
    });
  });

  it("should throw an error for an invalid email format", () => {
    const invalidUser = { ...validUser, email: "invalid-email" };

    expect(() => UserZodSchema.parse(invalidUser)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            path: ["email"],
            message: "Invalid email",
          }),
        ]),
      })
    );
  });

  it("should throw an error for an invalid dateOfBirth format", () => {
    const invalidUser = { ...validUser, dateOfBirth: "invalid-date" };

    expect(() => UserZodSchema.parse(invalidUser)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            path: ["dateOfBirth"],
            message: "Invalid date format",
          }),
        ]),
      })
    );
  });

  it("should validate a correct user object", () => {
    expect(() => UserZodSchema.parse(validUser)).not.toThrow();
  });
});

describe("ProfileDetailsZodSchema validation", () => {
  it("should validate a correct profile details object", () => {
    const validProfileDetails = {
      profilePicture: "https://example.com/profile.jpg",
      aboutMe: "Hello, I'm John!",
      selectedVideo: "https://youtube.com/video",
      socialLinks: {
        twitter: "https://twitter.com/johndoe",
      },
    };

    expect(() => ProfileDetailsZodSchema.parse(validProfileDetails)).not.toThrow();
  });

  it("should throw an error for an invalid URL in socialLinks", () => {
    const invalidProfileDetails = {
      socialLinks: {
        twitter: "invalid-url",
      },
    };

    expect(() => ProfileDetailsZodSchema.parse(invalidProfileDetails)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            path: ["socialLinks", "twitter"],
            message: "Invalid url",
          }),
        ]),
      })
    );
  });

  it("should allow optional fields to be absent", () => {
    const validProfileDetailssWithoutOptionalFields = {};

    expect(() =>
      ProfileDetailsZodSchema.parse(validProfileDetailssWithoutOptionalFields)
    ).not.toThrow();
  });
});

describe("StatisticsZodSchema validation", () => {
  it("should validate correct statistics", () => {
    const validStatistics = {
      profileViews: 100,
      offersGot: 50,
      income: 5000,
    };

    expect(() => StatisticsZodSchema.parse(validStatistics)).not.toThrow();
  });

  it("should allow optional fields to be absent", () => {
    const validStatisticsWithoutOptionalFields = {};

    expect(() => StatisticsZodSchema.parse(validStatisticsWithoutOptionalFields)).not.toThrow();
  });

  it("should throw an error for invalid number format (not int)", () => {
    const inValidStatistics = {
      profileViews: 100.999,
      offersGot: 50,
      income: 5000,
    };

    expect(() => StatisticsZodSchema.parse(inValidStatistics)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            path: ["profileViews"],
            message: "Expected integer, received float",
          }),
        ]),
      })
    );
  });
});

describe("SettingsZodSchema validation", () => {
  it("should validate correct settings", () => {
    const validSettings = {
      // Add valid settings fields here when defined
    };

    expect(() => SettingsZodSchema.parse(validSettings)).not.toThrow();
  });
});
