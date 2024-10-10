import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { UserModel } from "../models/userModel";

describe("User Mongoose Schema validation", () => {
  it("should save a valid user", async () => {
    const validUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: "user@example.com",
      typeOfAccount: "standard",
      password: "securepassword",
    });

    const savedUser = await validUser.save();
    expect(savedUser._id).toBe(validUser._id);
    expect(savedUser.email).toBe("user@example.com");
  });

  it("should not save a user without a required email", async () => {
    const invalidUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      typeOfAccount: "standard",
    });

    await expect(invalidUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it("should not allow invalid email format", async () => {
    const invalidUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: "invalid-email",
      typeOfAccount: "standard",
      password: "securepassword",
    });

    await expect(invalidUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it("should save a user with valid profile and social links", async () => {
    const validUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: "user@example.com",
      typeOfAccount: "standard",
      password: "securepassword",
      profileDetails: [
        {
          profilePicture: "https://example.com/profile.jpg",
          aboutMe: "Hello, I am John!",
          selectedVideo: "https://youtube.com/example",
          socialLinks: [
            {
              twitter: "https://twitter.com/johndoe",
              facebook: "https://facebook.com/johndoe",
              youtube: "https://youtube.com/johndoe",
            },
          ],
        },
      ],
    });

    const savedUser = await validUser.save();
    expect(savedUser.profileDetails[0].profilePicture).toBe("https://example.com/profile.jpg");
    expect(savedUser.profileDetails[0].socialLinks[0].twitter).toBe("https://twitter.com/johndoe");
  });

  it("should throw validation error for invalid social link URLs", async () => {
    const invalidUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: "user@example.com",
      typeOfAccount: "standard",
      password: "securepassword",
      profileDetails: [
        {
          socialLinks: [
            {
              twitter: "invalid-url",
            },
          ],
        },
      ],
    });

    await expect(invalidUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it("should save a user with valid statistics", async () => {
    const validUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: "user@example.com",
      typeOfAccount: "standard",
      password: "securepassword",
      statistics: [
        {
          profileViews: 100,
          offersGot: 50,
          offersAcccepted: 20,
          income: 5000,
          avgCapacity: 300,
          totalAtendees: 1000,
          totalEvents: 10,
        },
      ],
    });

    const savedUser = await validUser.save();
    expect(savedUser.statistics[0].profileViews).toBe(100);
    expect(savedUser.statistics[0].income).toBe(5000);
  });

  it("should throw validation error if statistics contains invalid fields", async () => {
    const invalidUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: "user@example.com",
      typeOfAccount: "standard",
      password: "securepassword",
      statistics: [
        {
          profileViews: "invalid-number", // Invalid non-numeric value
        },
      ],
    });

    await expect(invalidUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it("should save a user with partial fields in statistics and profileDetails", async () => {
    const partialUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: "user@example.com",
      typeOfAccount: "standard",
      password: "securepassword",
      statistics: [
        {
          profileViews: 100, // Partial statistics data
        },
      ],
      profileDetails: [
        {
          profilePicture: "https://example.com/profile.jpg", // Partial profile data
        },
      ],
    });

    const savedUser = await partialUser.save();
    expect(savedUser.statistics[0].profileViews).toBe(100);
    expect(savedUser.profileDetails[0].profilePicture).toBe("https://example.com/profile.jpg");
    expect(savedUser.statistics[0].income).toBeUndefined(); // Missing fields should be undefined
  });

  it("should allow saving user with multiple social links", async () => {
    const validUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: "user@example.com",
      typeOfAccount: "standard",
      password: "securepassword",
      profileDetails: [
        {
          socialLinks: [
            {
              twitter: "https://twitter.com/johndoe",
              facebook: "https://facebook.com/johndoe",
              youtube: "https://youtube.com/johndoe",
              instagram: "https://instagram.com/johndoe",
            },
          ],
        },
      ],
    });

    const savedUser = await validUser.save();
    expect(savedUser.profileDetails[0].socialLinks[0].twitter).toBe("https://twitter.com/johndoe");
    expect(savedUser.profileDetails[0].socialLinks[0].instagram).toBe(
      "https://instagram.com/johndoe"
    );
  });
});

// Helper function to create a user with a specific social link field
const createUserWithSocialLink = (socialLinkField: string, socialLinkValue: string) => {
  return new UserModel({
    _id: new mongoose.Types.ObjectId(),
    email: "user@example.com",
    typeOfAccount: "standard",
    password: "securepassword",
    profileDetails: [
      {
        socialLinks: [
          {
            [socialLinkField]: socialLinkValue,
          },
        ],
      },
    ],
  });
};

describe("User Mongoose Schema - SocialLinks validation", () => {
  // Valid URLs for different social platforms
  const validUrls = {
    twitter: "https://twitter.com/johndoe",
    facebook: "https://facebook.com/johndoe",
    youtube: "https://youtube.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    spotify: "https://open.spotify.com/artist/12345",
    tiktok: "https://www.tiktok.com/@johndoe",
  };

  // Invalid URLs for different social platforms
  const invalidUrls = {
    twitter: "invalid-twitter-url",
    facebook: "invalid-facebook-url",
    youtube: "invalid-youtube-url",
    instagram: "invalid-instagram-url",
    spotify: "invalid-spotify-url",
    tiktok: "invalid-tiktok-url",
  };

  // Test valid URLs
  test.each(Object.entries(validUrls))(
    "should allow valid %s URL",
    async (socialLinkField, socialLinkValue) => {
      const validUser = createUserWithSocialLink(socialLinkField, socialLinkValue);
      const savedUser = await validUser.save();
      expect(savedUser.profileDetails[0].socialLinks[0][socialLinkField]).toBe(socialLinkValue);
    }
  );

  // Test invalid URLs
  test.each(Object.entries(invalidUrls))(
    "should throw validation error for invalid %s URL",
    async (socialLinkField, socialLinkValue) => {
      const invalidUser = createUserWithSocialLink(socialLinkField, socialLinkValue);
      await expect(invalidUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
    }
  );

  // Test missing social links
  it("should allow saving user without any social links", async () => {
    const validUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: "user@example.com",
      typeOfAccount: "standard",
      password: "securepassword",
      profileDetails: [
        {
          socialLinks: [{}], // No social links provided
        },
      ],
    });

    const savedUser = await validUser.save();
    expect(savedUser.profileDetails[0].socialLinks[0].twitter).toBeUndefined();
    expect(savedUser.profileDetails[0].socialLinks[0].facebook).toBeUndefined();
  });

  // Test empty string fields
  test.each(Object.keys(validUrls))(
    "should throw validation error for empty %s field",
    async (socialLinkField) => {
      const invalidUser = createUserWithSocialLink(socialLinkField, "");
      await expect(invalidUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
    }
  );
});
