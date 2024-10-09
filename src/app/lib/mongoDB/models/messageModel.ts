import { model, models } from "mongoose";
import { MessageDoc, MessageSchema } from "../schemas/messageModel";

export const MessageModel = models.Message || model<MessageDoc>("Message", MessageSchema);
