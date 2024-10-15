import { NextRequest, NextResponse } from "next/server";
import { GETHelper } from "../getUserHelper";

export async function GET(request: NextRequest, { params }: { params: { _id: string } }) {
  return await GETHelper(params._id, "events");
}
