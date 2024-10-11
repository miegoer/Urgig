import { NextRequest, NextResponse } from "next/server";
import { GETHelper } from "../getUserHelper";
import { EventModel } from "@/app/lib/mongoDB/models/eventModel";
import mongoose from "mongoose";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return await GETHelper(params.id, "upcomingEvents");
  const data = await GETHelper(params.id, "upcomingEvents");

  if (data.error) return NextResponse.json({ error: data.error }, { status: data.status });
  console.log("data.ids", data.ids);

  // Convert string IDs to ObjectId
  // const objectIdArray = data.ids.map((id:string) => mongoose.Types.ObjectId(id));

  const events = await EventModel.find({
    _id: {
      $in: data.ids,
    },
  });

  console.log("events", events);

  return NextResponse.json(events, { status: 200 });
}
