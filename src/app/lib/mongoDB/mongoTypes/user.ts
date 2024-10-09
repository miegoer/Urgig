import { User } from "@/types/user";
import { Document } from "mongoose";

export interface UserDoc extends User, Document {
  _id: string;
}
