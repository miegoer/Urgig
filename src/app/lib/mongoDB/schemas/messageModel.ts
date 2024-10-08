import { Message } from "@/types/message";
import { Schema } from "mongoose";

export interface MessageDoc extends Message, Document {
  _id: string;
}

export const MessageSchema: Schema = new Schema({
  _id: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  viewedByReceiver: { type: Boolean, required: true, default: false },
});
