import { NextRequest, NextResponse } from "next/server";
import { GETHelper } from "../getUserHelper";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return GETHelper(params.id, "bookings");
}
