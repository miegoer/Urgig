import { Message } from "@/types/message";
import { Document } from "mongoose";

export interface MessageDoc extends Message, Document {
  _id: string;
}
