import { Schema, ValidatorProps } from "mongoose";

export const SocialLinksSchema: Schema = new Schema({
  twitter: {
    type: String,
    required: false,
    validate: {
      validator: (v: string) => /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/.test(v), // Regex for valid Twitter URLs
      message: (props: ValidatorProps) => `${props.value} is not a valid Twitter URL!`,
    },
  },
  facebook: {
    type: String,
    required: false,
    validate: {
      validator: (v: string) => /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{5,50}$/.test(v), // Regex for valid Facebook URLs
      message: (props: ValidatorProps) => `${props.value} is not a valid Facebook URL!`,
    },
  },
  youtube: {
    type: String,
    required: false,
    validate: {
      validator: (v: string) => /^https?:\/\/www\.youtube\.com\/@[a-zA-Z0-9_-]+$/.test(v), // Regex for valid YouTube URLs
      message: (props: ValidatorProps) => `${props.value} is not a valid YouTube URL!`,
    },
  },
  instagram: {
    type: String,
    required: false,
    validate: {
      validator: (v: string) => /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+$/.test(v), // Regex for valid Instagram URLs
      message: (props: ValidatorProps) => `${props.value} is not a valid Instagram URL!`,
    },
  },
  spotify: {
    type: String,
    required: false,
    validate: {
      validator: (v: string) =>
        /^https?:\/\/(www\.)?open\.spotify\.com\/artist\/[a-zA-Z0-9]+$/.test(v), // Regex for valid Spotify URLs
      message: (props: ValidatorProps) => `${props.value} is not a valid Spotify URL!`,
    },
  },
  tiktok: {
    type: String,
    required: false,
    validate: {
      validator: (v: string) => /^https?:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9._]{1,24}$/.test(v), // Regex for valid TikTok URLs
      message: (props: ValidatorProps) => `${props.value} is not a valid TikTok URL!`,
    },
  },
});
