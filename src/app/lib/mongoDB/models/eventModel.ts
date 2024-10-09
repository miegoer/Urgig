import { model, models } from "mongoose";
import { EventDoc, EventSchema } from "../schemas/eventSchema";

export const EventModel = models.Event || model<EventDoc>("Event", EventSchema);
