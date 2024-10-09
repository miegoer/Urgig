import { Event } from "@/types/event";
import { Document } from "mongoose";

export interface EventDoc extends Event, Document {
  _id: string;
}
