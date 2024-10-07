import mongoose, { Schema } from "mongoose";
import { Message } from "@/types/message";

export const MessageSchema: Schema = new Schema({
  _id: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  viewedByReceiver: { type: Boolean, required: true, default: false },
});

export const MessageModel =
  mongoose.models.Message || mongoose.model<Message>("Message", MessageSchema);
