import { Document } from "mongoose";

// Interface extending mongoose.Document
export type Message = Document & {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  viewedByReceiver: boolean;
};
